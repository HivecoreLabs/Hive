from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role, Employee


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password']


class RoleSerializer(serializers.ModelSerializer):
    employees = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), many=True)

    class Meta:
        model = Role
        fields = ['id', 'role', 'description', 'created_at',
                  'updated_at', 'sheet_cell', 'is_uploaded']


class EmployeeSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True)

    class Meta:
        model = Employee
        fields = ['first_name', 'last_name', 'restaurant_employee_id', 'roles', 'food_permit_exp',
                  'alcohol_permit_exp', 'is_former_employee', 'created_at', 'updated_at', 'sheet_cell', 'is_uploaded']
