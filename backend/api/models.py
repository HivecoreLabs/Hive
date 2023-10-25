from django.db import models

# Create your models here.

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    restaurant_employee_id = models.CharField(max_length=10, null=True)
    food_permit_exp = models.DateField(null=True)
    alcohol_permit_exp = models.DateField(null=True)
    is_former_employee = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True)
    is_uploaded = models.BooleanField(default=False)

class Role(models.Model):
    role = models.CharField(max_length = 50)
    description = models.TextField(max_length = 500, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True)
    is_uploaded = models.BooleanField(default=False)

class Employee_Role(models.Model):
    role_id = models.ForeignKey(Role, on_delete=models.PROTECT)
    employee_id = models.ForeignKey(Employee, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True)
    is_uploaded = models.BooleanField(default=False)

class Checkout(models.Model):
    net_sales = models.DecimalField(decimal_places=2)
    cash_owed = models.DecimalField(decimal_places=2)
    employee_id = models.ForeignKey(Employee, on_delete=models.PROTECT)
    total_tipout = models.DecimalField(decimal_places=2)
    is_am_shift = models.BooleanField(default=True)
    is_patio = models.BooleanField(default=False)
    is_bar = models.BooleanField(default=False)
    tipout_day = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True)
    is_uploaded = models.BooleanField(default=False)

class Employee_Clock_In(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.PROTECT)
    time_in = models.DateTimeField(null=True)
    time_out = models.DateTimeField(null=True)
    active_role_id = models.ForeignKey(Role)
    tipout_received = models.DecimalField(decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True)
    is_uploaded = models.BooleanField(default=False)

class Tipout_Formula(models.Model):
    formula_name = models.CharField(max_length=50)
    formula = models.CharField()
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE)
    is_am_formula = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True)
    is_uploaded = models.BooleanField(default=False)

class Tipout_Variable(models.Model):
    variable = models.CharField()
    tipout_formula_id = models.ForeignKey(Tipout_Formula, on_delete=models.CASCADE)
    table_name = models.CharField()
    column_name = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True)
    is_uploaded = models.BooleanField(default=False)
