from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.db.models import Subquery, OuterRef
from decimal import Decimal, getcontext, ROUND_05UP
from datetime import datetime


from django.contrib.auth.models import User
from .models import (
    Role,
    Employee,
    SpreadSheet,
    Tipout_Formula,
    Tipout_Variable,
    Employee_Clock_In,
    Checkout_Tipout_Breakdown,
    Checkout
)
from .serializers import (
    UserSerializer,
    RoleSerializer,
    EmployeeSerializer,
    SpreadSheetSerializer,
    ReadFormulaSerializer,
    WriteFormulaSerializer,
    Read_Clock_In_Serializer,
    Write_Clock_In_Serializer,
    FormulaVariableSerializer,
    CheckoutSerializer,
    TipoutBreakdownSerializer,
    ReadLimitedClockInSerializer
)
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
    serializer_class = ReadFormulaSerializer

    def create(self, request, pk=None):
        formula_serializer = WriteFormulaSerializer(data=request.data)
        formula_serializer.is_valid(raise_exception=True)
        formula_instance = formula_serializer.save()

        variable_data = request.data.get('tipout_variables', [])
        for data in variable_data:
            data['tipout_formula_id'] = formula_instance.id
        variable_serializer = FormulaVariableSerializer(data=variable_data, many=True)
        variable_serializer.is_valid(raise_exception=True)
        variables = variable_serializer.save()

        formula = Tipout_Formula.objects.get(id=formula_instance.id)
        return Response(
            {
                'message': f'{len(variables)} formula variables created successfully',
                'formula': ReadFormulaSerializer(formula).data
            },
                status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        formula_instance = self.get_object()
        data = request.data
        formula_serializer = WriteFormulaSerializer(formula_instance, data=data)
        formula_serializer.is_valid(raise_exception=True)
        formula_serializer.save()

        variable_data = request.data.get('tipout_variables', [])
        updated = 0
        created = 0
        for data in variable_data:
            data['is_uploaded'] = False
            if 'id' in data and data['tipout_formula_id'] == formula_instance.id:
                try:
                    variable_instance = Tipout_Variable.objects.get(id=data['id'])
                    variable_serializer = FormulaVariableSerializer(variable_instance, data=data)
                    variable_serializer.is_valid(raise_exception=True)
                    variable_serializer.save()
                    updated += 1
                except Tipout_Variable.DoesNotExist:
                    data['tipout_formula_id'] = formula_instance.id
                    variable_serializer = FormulaVariableSerializer(data=data)
                    variable_serializer.is_valid(raise_exception=True)
                    variable_serializer.save()
                    created += 1
            else:
                data['tipout_formula_id'] = formula_instance.id
                variable_serializer = FormulaVariableSerializer(data=data)
                variable_serializer.is_valid(raise_exception=True)
                variable_serializer.save()
                created += 1

        updated_formula = Tipout_Formula.objects.get(id=formula_instance.id)
        return Response(
            {
                'message': f'Formula successfully updated, {updated} variable(s) updated, {created} new variable(s) created',
                'formula': ReadFormulaSerializer(updated_formula).data
            },
            status=status.HTTP_200_OK)


class VariablesViewSet(viewsets.ModelViewSet):
    queryset = Tipout_Variable.objects.all()
    serializer_class = FormulaVariableSerializer

    def list(self, request, formula_pk=None):
        if formula_pk:
            queryset = Tipout_Variable.objects.filter(tipout_formula_id=formula_pk)
        else:
            queryset = Tipout_Variable.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
    def get_queryset(self):
        queryset = Employee_Clock_In.objects.all()
        params = self.request.query_params
        date = params.get('date')
        if date:
            queryset = Employee_Clock_In.objects.filter(date=date)
        return queryset

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

    def list(self, request, employee_pk=None):
        params = request.query_params
        date = params.get('date')
        if date:
            queryset = Employee_Clock_In.objects.filter(employee_id=employee_pk, date=date)
        else:
            queryset = Employee_Clock_In.objects.filter(employee_id=employee_pk)
        serializer = Read_Clock_In_Serializer(queryset, many=True)
        return Response(serializer.data)


class RoleClockInViewSet(viewsets.ViewSet):
    serializer_class = Read_Clock_In_Serializer

    def list(self, request, role_pk=None):
        params = request.query_params
        date = params.get('date')
        if date:
            queryset = Employee_Clock_In.objects.filter(active_role_id=role_pk, date=date)
        else:
            queryset = Employee_Clock_In.objects.filter(active_role_id=role_pk)
        serializer = Read_Clock_In_Serializer(queryset, many=True)
        return Response(serializer.data)

class CheckOutViewSet(viewsets.ViewSet):
    serializer_class = CheckoutSerializer
    tipout_breakdown_serializer_class = TipoutBreakdownSerializer
    # create a new checkout instance based on the passed in data
    # {
    # "net_sales": 5000,
    # "cash_owed": 100,
    # "tipout_day": "2023-11-03",
    # "employee_id":1
    # }
    # instantiate total var = 0
    # get all unique support roles for day and shift (am/pm)
    # get all related formulas for each role
    # get all related variables for each formula ^
    # substitute each variable in the formula with its literal value (table + column/ row should be determined by day)
    # eval(formula) -> feval (packkage)
    # save instance of tipout breakdown
    # add to running total
    # save total_tipped_out
    # return checkout object with updated total, and all of the tipout breakdowns
    # {checkout info..., breakdowns: [{breakdown obj}...,]}
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

@api_view(['POST'])
def end_of_day(request):

    def _calculate_totals(checkouts):
        role_totals = {}
        for checkout in checkouts:
            role_id = checkout['checkout_tipout_breakdown__role_id']
            total = checkout['checkout_tipout_breakdown__total']
            if role_id and total:
                role_totals[role_id] = role_totals.get(role_id, 0) + total
        return role_totals
    def _calculate_total_role_hours(support_staff):
        role_hour_totals = {}
        for staff in support_staff:
            role_id = staff.active_role_id.id
            time_in = staff.time_in
            time_out = staff.time_out

            if time_in and time_out:
                role_hour_totals[role_id] = role_hour_totals.get(role_id,0) + (time_out-time_in).total_seconds()
        return role_hour_totals
    def _get_formula_and_determine_percent_worked(total_time_dictionary, staff_list, totals_dictionary):

        for staff in staff_list:
            time_in = staff.time_in
            time_out = staff.time_out
            if time_in and time_out:
                total_time_worked = (time_out - time_in).total_seconds()
                role_id = staff.active_role_id.id
                percent_worked = total_time_worked/total_time_dictionary[role_id]

                tipout_received = totals_dictionary[role_id] * Decimal(percent_worked)
                tipout_received = Decimal("{:.2f}".format(tipout_received))

                staff.tipout_received = tipout_received
                staff.save(update_fields=["tipout_received"])

        updated_staff_list = ReadLimitedClockInSerializer(staff_list, many=True)
        return updated_staff_list.data


    am_support_staff = Employee_Clock_In.objects.filter(date=request.data["date"], is_am=True)
    pm_support_staff = Employee_Clock_In.objects.filter(date=request.data["date"], is_am=False)


    am_checkouts = Checkout.objects.filter(date=request.data["date"], is_am_shift=True).values("checkout_tipout_breakdown__role_id", "checkout_tipout_breakdown__total", "checkout_tipout_breakdown__id")
    pm_checkouts = Checkout.objects.filter(date=request.data["date"], is_am_shift=False).values("checkout_tipout_breakdown__role_id", "checkout_tipout_breakdown__total", "checkout_tipout_breakdown__id")

    am_totals = _calculate_totals(am_checkouts)
    pm_totals = _calculate_totals(pm_checkouts)

    am_hour_totals = _calculate_total_role_hours(am_support_staff)
    pm_hour_totals = _calculate_total_role_hours(pm_support_staff)

    am_list_of_employee_tipouts_received = _get_formula_and_determine_percent_worked(am_hour_totals, am_support_staff, am_totals)
    pm_list_of_employee_tipouts_received = _get_formula_and_determine_percent_worked(pm_hour_totals, pm_support_staff, pm_totals)


    return Response({"am":am_list_of_employee_tipouts_received, "pm":pm_list_of_employee_tipouts_received}, status = status.HTTP_200_OK)
