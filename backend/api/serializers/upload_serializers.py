from rest_framework import serializers
from api.models import Role, Employee, Employee_Role, Checkout, Checkout_Tipout_Breakdown, Employee_Clock_In, Tipout_Formula, Tipout_Variable

class UploadRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "role", "description", "created_at", "updated_at"]

class UploadEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "first_name", "last_name", "restaurant_employee_id", "food_permit_exp", "alcohol_permit_exp", "is_former_employee", "created_at", "updated_at"]

class UploadEmployeeRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee_Role
        fields = ["id", "role_id", "employee_id", "created_at", "updated_at"]

class UploadCheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = ["id", "date", "net_sales", "cash_owed", "employee_id", "total_tipout", "is_am_shift", "is_patio", "is_bar", "created_at", "updated_at"]

class UploadCheckoutTipoutBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout_Tipout_Breakdown
        fields = ["id", "checkout_id", "role_id", "total"]

class UploadEmployeeClockInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee_Clock_In
        fields = ["id", "employee_id", "date", "time_in", "time_out", "active_role_id", "tipout_received", "is_am", "created_at", "updated_at"]

class UploadTipoutFormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipout_Formula
        fields = ["id", "formula_name", "formula", "role_id", "is_am_formula", "is_time_based", "created_at", "updated_at"]

class UploadTipoutVariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipout_Variable
        fields = ["id", "variable", "tipout_formula_id", "table_name", "column_name", "created_at", "updated_at"]
