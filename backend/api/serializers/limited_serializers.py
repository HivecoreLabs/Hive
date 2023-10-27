from rest_framework import serializers
from api.models import Employee, Role


class ReadLimitedRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('role')


class ReadLimitedEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('first_name', 'last_name', 'restaurant_employee_id')
