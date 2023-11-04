from rest_framework import serializers
from api.models import Employee, Role, Employee_Clock_In


class ReadLimitedRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'role')


class ReadLimitedEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'restaurant_employee_id')

class ReadLimitedClockInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee_Clock_In
        fields = ('id', 'active_role_id', 'employee_id', 'tipout_received', 'date', 'time_in', 'time_out', 'is_am')
