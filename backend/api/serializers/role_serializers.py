from rest_framework import serializers
from api.models import Role
from api.serializers import ReadLimitedEmployeeSerializer


class ReadRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('role', 'description', 'created_at',
                  'updated_at', 'sheet_cell', 'is_uploaded')


class ReadRoleWithEmployeeSerializer(serializers.ModelSerializer):
    employees = ReadLimitedEmployeeSerializer(many=True, read_only=True)

    class Meta:
        model = Role
        fields = ('role', 'description', 'employees', 'created_at',
                  'updated_at', 'sheet_cell', 'is_uploaded')
        depth = 1


class WriteRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('role', 'description', 'created_at',
                  'updated_at', 'is_uploaded')
