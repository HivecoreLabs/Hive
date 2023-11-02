from rest_framework import serializers
from api.models import Employee
from .limited_serializers import ReadLimitedRoleSerializer


class EmployeeSerializer(serializers.ModelSerializer):
    roles = ReadLimitedRoleSerializer(many=True, read_only=True)

    class Meta:
        model = Employee
        fields = ('first_name', 'last_name', 'restaurant_employee_id', 'roles', 'food_permit_exp',
                  'alcohol_permit_exp', 'is_former_employee', 'created_at', 'updated_at', 'sheet_cell', 'is_uploaded')
