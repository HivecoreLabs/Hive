from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.db.models import Subquery, OuterRef
from decimal import Decimal, getcontext, ROUND_05UP
from datetime import datetime
from sympy import sympify

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
    ReadLimitedClockInSerializer,
    ReadCheckoutSerializer
)
from .serializers.upload_serializers import (
    UploadCheckoutSerializer,
    UploadCheckoutTipoutBreakdownSerializer,
    UploadEmployeeClockInSerializer,
    UploadEmployeeRoleSerializer,
    UploadEmployeeSerializer,
    UploadRoleSerializer,
    UploadTipoutFormulaSerializer,
    UploadTipoutVariableSerializer
)

from api.utils.views import *
from backend.quickstart import generate
from backend.upload import add_records_to_spreadsheet
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

    def list(self, request):
        params = request.query_params
        date = params.get('date')
        is_am_shift = params.get('is_am_shift')
        if date and 'is_am_shift' in params:
            queryset = Checkout.objects.filter(date=date, is_am_shift=is_am_shift)
        elif date:
            queryset = Checkout.objects.filter(date=date)
        else:
            queryset = Checkout.objects.all()

        serializer = ReadCheckoutSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        queryset = Checkout.objects.all()
        checkout_instance = get_object_or_404(queryset, pk=pk)
        serializer = ReadCheckoutSerializer(checkout_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        checkout_serializer = CheckoutSerializer(data=request.data)
        checkout_serializer.is_valid(raise_exception=True)

        support_employees = Employee_Clock_In.objects.filter(date=request.data["date"], is_am=request.data['is_am_shift'], active_role_id__is_bar=request.data['is_bar'])

        grouped_by_role = group_by_active_role(support_employees)

        total = 0
        tipouts = []
        for role in grouped_by_role:
            formula = Tipout_Formula.objects.filter(role_id=role).values('formula', 'min_sales', 'max_tipout', 'is_time_based')
            tipout_received = calculate_tipout_received_from_net_sales(formula[0], grouped_by_role[role], request.data['net_sales'])
            total += tipout_received
            tipouts.append({"role_id": role.id, "total": tipout_received})

        total_owed = request.data['cash_owed'] + total

        request.data['total_owed'] = total_owed
        request.data['total_tipout'] = total
        checkout_serializer = CheckoutSerializer(data=request.data)
        checkout_serializer.is_valid(raise_exception=True)
        checkout_instance = checkout_serializer.save()
        for tipout in tipouts:
            tipout['checkout_id'] = checkout_instance.id
        checkout_breakdown_serializer = TipoutBreakdownSerializer(data=tipouts, many=True)
        checkout_breakdown_serializer.is_valid(raise_exception=True)
        checkout_breakdown_serializer.save()

        return Response(ReadCheckoutSerializer(checkout_instance).data, status=status.HTTP_201_CREATED)


class EndOfDayViewSet(viewsets.ViewSet):
    def create(self, request):
        am_support_staff = Employee_Clock_In.objects.filter(date=request.data["date"], is_am=True)
        pm_support_staff = Employee_Clock_In.objects.filter(date=request.data["date"], is_am=False)

        am_checkouts = Checkout.objects.filter(date=request.data["date"], is_am_shift=True).values("checkout_tipout_breakdown__role_id", "checkout_tipout_breakdown__total", "checkout_tipout_breakdown__id", "net_sales", "total_owed")
        pm_checkouts = Checkout.objects.filter(date=request.data["date"], is_am_shift=False).values("checkout_tipout_breakdown__role_id", "checkout_tipout_breakdown__total", "checkout_tipout_breakdown__id", "net_sales", "total_owed")

        am_totals = calculate_totals(am_checkouts)
        pm_totals = calculate_totals(pm_checkouts)

        am_net_sales = sum([checkout['net_sales'] for checkout in am_checkouts])
        pm_net_sales = sum([checkout['net_sales'] for checkout in pm_checkouts])
        total_net_sales = am_net_sales + pm_net_sales

        am_cash_owed = sum([checkout['total_owed'] for checkout in am_checkouts])
        pm_cash_owed = sum([checkout['total_owed'] for checkout in pm_checkouts])
        total_cash_owed = am_cash_owed + pm_cash_owed

        am_hour_totals = calculate_total_role_hours(am_support_staff)
        pm_hour_totals = calculate_total_role_hours(pm_support_staff)

        am_list_of_employee_tipouts_received = get_formula_and_determine_percent_worked(am_hour_totals, am_support_staff, am_totals)
        pm_list_of_employee_tipouts_received = get_formula_and_determine_percent_worked(pm_hour_totals, pm_support_staff, pm_totals)

        return Response({
            "total_net_sales": total_net_sales,
            "total_cash_owed": total_cash_owed,
            "am": {
                "net_sales": am_net_sales,
                "cash_owed": am_cash_owed,
                "tipouts": am_list_of_employee_tipouts_received,
            },
            "pm": {
                "net_sales": pm_net_sales,
                "cash_owed": pm_cash_owed,
                "tipouts": pm_list_of_employee_tipouts_received
            }
                }, status = status.HTTP_200_OK)


# @api_view(['POST'])
# def end_of_day(request):
#     am_support_staff = Employee_Clock_In.objects.filter(date=request.data["date"], is_am=True)
#     pm_support_staff = Employee_Clock_In.objects.filter(date=request.data["date"], is_am=False)


#     am_checkouts = Checkout.objects.filter(date=request.data["date"], is_am_shift=True).values("checkout_tipout_breakdown__role_id", "checkout_tipout_breakdown__total", "checkout_tipout_breakdown__id", "net_sales", "total_owed")
#     pm_checkouts = Checkout.objects.filter(date=request.data["date"], is_am_shift=False).values("checkout_tipout_breakdown__role_id", "checkout_tipout_breakdown__total", "checkout_tipout_breakdown__id", "net_sales", "total_owed")

#     am_totals = calculate_totals(am_checkouts)
#     pm_totals = calculate_totals(pm_checkouts)

#     am_net_sales = sum([checkout['net_sales'] for checkout in am_checkouts])
#     pm_net_sales = sum([checkout['net_sales'] for checkout in pm_checkouts])
#     total_net_sales = am_net_sales + pm_net_sales

#     # use this if we want total owed sum
#     am_cash_owed = sum([checkout['total_owed'] for checkout in am_checkouts])
#     pm_cash_owed = sum([checkout['total_owed'] for checkout in pm_checkouts])
#     total_cash_owed = am_cash_owed + pm_cash_owed

#     am_hour_totals = calculate_total_role_hours(am_support_staff)
#     pm_hour_totals = calculate_total_role_hours(pm_support_staff)

#     am_list_of_employee_tipouts_received = get_formula_and_determine_percent_worked(am_hour_totals, am_support_staff, am_totals)
#     pm_list_of_employee_tipouts_received = get_formula_and_determine_percent_worked(pm_hour_totals, pm_support_staff, pm_totals)

#     return Response({
#         "total_net_sales": total_net_sales,
#         "total_cash_owed": total_cash_owed,
#         "am": {
#             "net_sales": am_net_sales,
#             "cash_owed": am_cash_owed,
#             "tipouts": am_list_of_employee_tipouts_received,
#         },
#         "pm": {
#             "net_sales": pm_net_sales,
#             "cash_owed": pm_cash_owed,
#             "tipouts": pm_list_of_employee_tipouts_received
#         }
#             }, status = status.HTTP_200_OK)

@api_view(['POST'])
def upload_db(request):
    pass
    # Role,
    # Employee,
    # SpreadSheet,
    # Tipout_Formula,
    # Tipout_Variable,
    # Employee_Clock_In,
    # Checkout_Tipout_Breakdown,
    # Checkout
    role_queryset = Role.objects.filter(is_uploaded=False)
    employee_queryset = Employee.objects.filter(is_uploaded=False)
    formula_queryset = Tipout_Formula.objects.filter(is_uploaded=False)
    clock_in_queryset = Employee_Clock_In.objects.filter(is_uploaded=False)
    checkout_queryset = Checkout.objects.filter(is_uploaded=False)
    breakdown_queryset = Checkout_Tipout_Breakdown.objects.filter(is_uploaded=False)

    serialized_roles = UploadRoleSerializer(role_queryset, many=True).data
    serialized_employees = UploadEmployeeSerializer(employee_queryset, many=True).data
    serialized_formulas = UploadTipoutFormulaSerializer(formula_queryset, many=True).data
    serialized_clock_ins = UploadEmployeeClockInSerializer(clock_in_queryset, many=True).data
    serialized_checkouts = UploadCheckoutSerializer(checkout_queryset, many=True).data
    serialized_breakdown = UploadCheckoutTipoutBreakdownSerializer(breakdown_queryset, many=True).data

    spreadsheet_id = SpreadSheetSerializer(SpreadSheet.objects.last()).data["database_google_id"]
    # print(spreadsheet_id)
    print("serialized roles: ",serialized_roles)
    add_records_to_spreadsheet('Role', serialized_roles, spreadsheet_id)
    add_records_to_spreadsheet('Employee', serialized_employees, spreadsheet_id)
    add_records_to_spreadsheet('Tipout_Formula', serialized_formulas, spreadsheet_id)
    add_records_to_spreadsheet('Employee_Clock_In', serialized_clock_ins, spreadsheet_id)
    add_records_to_spreadsheet('Checkout', serialized_checkouts, spreadsheet_id)
    add_records_to_spreadsheet('Checkout_Tipout_Breakdown', serialized_breakdown, spreadsheet_id)

    return Response({
        "roles": serialized_roles,
        "employees": serialized_employees,
        "formulas": serialized_formulas,
        "clock_ins": serialized_clock_ins,
        "checkouts": serialized_checkouts,
        "breakdowns": serialized_breakdown
                     })
