from rest_framework import serializers
from api.models import Employee_Clock_In
from .limited_serializers import ReadLimitedEmployeeSerializer, ReadLimitedRoleSerializer

class Read_Clock_In_Serializer(serializers.ModelSerializer):
    parent_lookup_kwargs = {
        'employee_pk': 'employee_pk',
        'role_pk': 'role_pk'
    }

    employee = ReadLimitedEmployeeSerializer(source='employee_id', read_only=True)
    active_role = ReadLimitedRoleSerializer(source='active_role_id', read_only=True)

    class Meta:
        model=Employee_Clock_In
        fields=('id', 'employee', 'active_role', 'date', 'is_am', 'tipout_received', 'time_in', 'time_out')


class Write_Clock_In_Serializer(serializers.ModelSerializer):
    parent_lookup_kwargs = {
        'employee_pk': 'employee_pk',
        'role_pk': 'role_pk'
    }
    class Meta:
        model=Employee_Clock_In
        fields='__all__'
