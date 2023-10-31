from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from .models import Role, Employee, SpreadSheet, Employee_Clock_In
from .serializers import UserSerializer, RoleSerializer, EmployeeSerializer, Employee_Clock_In_Serializer, SpreadSheetSerializer
from backend.quickstart import generate

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


class EmployeeClockInViewSet(viewsets.ModelViewSet):
    queryset = Employee_Clock_In.objects.all()
    serializer_class = Employee_Clock_In_Serializer
