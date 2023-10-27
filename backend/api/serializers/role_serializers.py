from rest_framework import serializers
from api.models import Role
from api.serializers import ReadLimitedEmployeeSerializer


class RoleSerializer(serializers.ModelSerializer):
    employees = ReadLimitedEmployeeSerializer(many=True, read_only=True)

    class Meta:
        model = Role
        fields = ('id', 'role', 'description', 'employees', 'created_at',
                  'updated_at', 'sheet_cell', 'is_uploaded')
