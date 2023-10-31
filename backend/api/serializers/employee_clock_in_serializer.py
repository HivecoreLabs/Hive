from rest_framework import serializers
from api.models import Employee_Clock_In, Employee, Role
from .limited_serializers import ReadLimitedEmployeeSerializer, ReadLimitedRoleSerializer

class Employee_Clock_In_Serializer(serializers.ModelSerializer):
    employee = ReadLimitedEmployeeSerializer(source='employee_id', read_only=True)
    active_role = ReadLimitedRoleSerializer(source='active_role_id', read_only=True)

    class Meta:
        model=Employee_Clock_In
        fields=('employee', 'active_role', 'time_in', 'time_out')
