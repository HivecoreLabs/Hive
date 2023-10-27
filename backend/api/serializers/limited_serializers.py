from rest_framework import serializers
from api.models import Employee, Role


class ReadLimitedRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'role')


class ReadLimitedEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'restaurant_employee_id')
