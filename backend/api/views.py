from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from .models import Role, Employee, SpreadSheet, Tipout_Formula, Tipout_Variable, Employee_Clock_In
from .serializers import UserSerializer, RoleSerializer, EmployeeSerializer, SpreadSheetSerializer, FormulaSerializer, Read_Clock_In_Serializer, Write_Clock_In_Serializer, FormulaVariableSerializer
from backend.quickstart import generate

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
