from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.db.models import Subquery, OuterRef
from decimal import Decimal


from django.contrib.auth.models import User
from .models import Role, Employee, SpreadSheet, Tipout_Formula, Tipout_Variable, Employee_Clock_In
from .serializers import UserSerializer, RoleSerializer, EmployeeSerializer, SpreadSheetSerializer, FormulaSerializer, Read_Clock_In_Serializer, Write_Clock_In_Serializer, FormulaVariableSerializer, CheckoutSerializer, TipoutBreakdownSerializer, Read_Clock_In_Serializer_No_Role
from backend.quickstart import generate
from datetime import date

@api_view(['GET'])
def get_tables_columns(request):
    # table_name = MyModel._meta.db_table
    tables_dictionary = {}
    tables_dictionary[Role._meta.db_table] = [field.name for field in Role._meta.get_fields()]
    tables_dictionary[Employee._meta.db_table] = [field.name for field in Employee._meta.get_fields()]
    tables_dictionary[SpreadSheet._meta.db_table] = [field.name for field in SpreadSheet._meta.get_fields()]
    tables_dictionary[Tipout_Formula._meta.db_table] = [field.name for field in Tipout_Formula._meta.get_fields()]
    tables_dictionary[Tipout_Variable._meta.db_table] = [field.name for field in Tipout_Variable._meta.get_fields()]

    return Response(tables_dictionary, status=200)
@api_view(['POST'])
def generate_sheet_database(request):
    generated_id = generate("Sheets Database")

    if generated_id:
        spreadsheet = SpreadSheet(database_google_id=generated_id)
        spreadsheet.save()

        serializer = SpreadSheetSerializer(spreadsheet)
        return Response(serializer.data, status=201)

    else:
        return Response(
            {'error': 'The sheet failed to generate. Please check your credentials file and try again.'},
            status=400
        )

@api_view(['POST'])
def login(request):
    data = request.data
    if 'username' not in data and 'password' not in data:
        return Response({'username': ['This field is required.'], 'password': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)
    elif 'username' not in data:
        return Response({'username': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)
    elif 'password' not in data:
        return Response({'password': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, username=data['username'])
    if not user.check_password(data['password']):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({
        "token": token.key,
        "user":
            {"id": serializer.data["id"],
                "username": serializer.data["username"]
             }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def signup(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=data['username'])
        user.set_password(data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({
            "token": token.key,
            "user":
                {"id": serializer.data["id"],
                 "username": serializer.data["username"]
                 }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FormulaViewSet(viewsets.ModelViewSet):
    queryset = Tipout_Formula.objects.all()
    serializer_class = FormulaSerializer

    def create_formula_variables(self, request, pk=None):
        formula = self.get_object()
        serializer = FormulaVariableSerializer(data=request.data, many=True)
        formula_id = int(pk)

        if serializer.is_valid():
            # Create formula variables and associate them with the formula
            formula_variables = []
            for data in serializer.validated_data:
                formula_variable = Tipout_Variable.objects.create(**data)
                formula_variables.append(formula_variable)

            return Response({'message': f'{len(formula_variables)} formula variables created successfully', 'formula': FormulaSerializer(formula).data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VariablesViewSet(viewsets.ModelViewSet):
    queryset = Tipout_Variable.objects.all()
    serializer_class = FormulaVariableSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            if 'roles' in request.data:
                employee_roles = []
                for employee_role in request.data['roles']:
                    try:
                        role = Role.objects.get(role=employee_role)
                        employee_roles.append(role)
                    except Role.DoesNotExist:
                        pass
                employee.roles.set(employee_roles)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        employee_instance = self.get_object()
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            employee_instance.first_name = data["first_name"]
            employee_instance.last_name = data["last_name"]
            employee_instance.restaurant_employee_id = data[
                "restaurant_employee_id"] if "restaurant_employee_id" in data else employee_instance.restaurant_employee_id
            employee_instance.food_permit_exp = data[
                "food_permit_exp"] if "food_permit_exp" in data else employee_instance.food_permit_exp
            employee_instance.alcohol_permit_exp = data[
                "alcohol_permit_exp"] if "alcohol_permit_exp" in data else employee_instance.alcohol_permit_exp
            employee_instance.is_uploaded = False

            if 'roles' in data:
                employee_roles = []
                for employee_role in data['roles']:
                    try:
                        role = Role.objects.get(role=employee_role)
                        employee_roles.append(role)
                    except Role.DoesNotExist:
                        pass
                employee_instance.roles.set(employee_roles)

            employee_instance.save()

            serializer = EmployeeSerializer(employee_instance)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClockInViewSet(viewsets.ModelViewSet):
    queryset = Employee_Clock_In.objects.all()
    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'list' or self.action == 'retrieve':
            return Read_Clock_In_Serializer
        return Write_Clock_In_Serializer

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=is_many)
        if serializer.is_valid():
            data = serializer.save()
            return Response(Read_Clock_In_Serializer(data, many=is_many).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            data = serializer.save()
            return Response(Read_Clock_In_Serializer(data).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # TODO: Config DELETE to check if a checkout has already been created using clockin instance
            # If it has we need to figure out a way to update the checkout and alert user that changes were made


class EmployeeClockInViewSet(viewsets.ViewSet):
    serializer_class = Read_Clock_In_Serializer

    def list(self, requeset, employee_pk=None):
        queryset = Employee_Clock_In.objects.filter(employee_id=employee_pk)
        serializer = Read_Clock_In_Serializer(queryset, many=True)
        return Response(serializer.data)


class RoleClockInViewSet(viewsets.ViewSet):
    serializer_class = Read_Clock_In_Serializer

    def list(self, requeset, role_pk=None):
        queryset = Employee_Clock_In.objects.filter(active_role_id=role_pk)
        serializer = Read_Clock_In_Serializer(queryset, many=True)
        return Response(serializer.data)

class CheckOutViewSet(viewsets.ViewSet):
    serializer_class = CheckoutSerializer
    tipout_breakdown_serializer_class = TipoutBreakdownSerializer

    def post_checkout_and_generate_breakdown(self, request):

        serializer = CheckoutSerializer(data=request.data)

        if serializer.is_valid():
            # Create the checkout
            checkout = serializer.save()
            current_date = request.data['tipout_day']
            # looks like
            # [{'active_role_id': 1}, {'active_role_id': 3}, {'active_role_id': 4}, {'active_role_id': 5}, {'active_role_id': 7}, {'active_role_id': 9}]
            support_staff_on_day = Employee_Clock_In.objects.filter(
                date=current_date
            ).values('active_role_id', 'active_role_id__tipout_formula').distinct()
            # print('------------')
            # print('------------')
            # print(support_staff_on_day)
            # print('------------')
            # print('------------')
            # print('------------')
            total_tipped_out = Decimal(0)
            for role in support_staff_on_day:
                # {'active_role_id': 9, 'active_role_id__tipout_formula': 9}
                # print(role)
                formula_instance = Tipout_Formula.objects.get(id=role['active_role_id__tipout_formula'])
                variable_instances = Tipout_Variable.objects.filter(tipout_formula_id=role['active_role_id__tipout_formula'])
                print(variable_instances)
                # calculate
                # save each calc
                # add to running total
            # update checkout instance tipout_total to total tipped out
            # return serialized response with all related checkout tipout bd instances


            # get a list of unique roles clocked in for support staff -/
            # we want to get all the formulas related to those roles -/
            # we want to iterate over each of the formulas, and calculate them -!!
            # at each iteration, we should create a new ckouttobd instance and save it
            # then we update the checkout instances tipout_total with the total amount from that
            # return response including the checkout, and all related co tipout bd instances

            # clock_in_serializer = Read_Clock_In_Serializer_No_Role(support_staff_on_day, many=True)
            response_data = {
                # 'roles' : clock_in_serializer.data,
                # 'formulas': None,
                'checkout': serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
            # for support_staff in support
            # print()
            # for breakdown_data in tipout_breakdowns:
            #     breakdown_serializer = TipoutBreakdownSerializer(data=breakdown_data)
            #     if breakdown_serializer.is_valid():
            #         breakdown = breakdown_serializer.save(checkout=checkout)
            #         tipout_breakdowns.append(breakdown)

            # response_data = {
            #     'checkout': CheckoutSerializer(checkout).data,
            #     'tipout_breakdowns': [CheckoutTipoutBreakdownSerializer(b).data for b in tipout_breakdowns]
            # }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
