from django.utils.translation import gettext
from django.db import models
import datetime

class SpreadSheet(models.Model):
    database_google_id = models.CharField(max_length=250)

    def __str__(self) -> str:
        return f'{self.database_google_id}'


class Role(models.Model):
    role = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=500, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.role}'


class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    restaurant_employee_id = models.CharField(max_length=10, null=True)
    roles = models.ManyToManyField(
        Role, related_name='employees', through='Employee_Role')
    food_permit_exp = models.DateField(null=True)
    alcohol_permit_exp = models.DateField(null=True)
    is_former_employee = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'


class Employee_Role(models.Model):
    role_id = models.ForeignKey(Role, on_delete=models.PROTECT)
    employee_id = models.ForeignKey(Employee, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)


class Checkout(models.Model):
    date = models.DateField(gettext('Date'), default=datetime.date.today)
    net_sales = models.DecimalField(decimal_places=2, max_digits=8)
    cash_owed = models.DecimalField(decimal_places=2, max_digits=8)
    total_owed = models.DecimalField(decimal_places=2, max_digits=8, null=True)
    employee_id = models.ForeignKey(Employee, on_delete=models.PROTECT)
    total_tipout = models.DecimalField(decimal_places=2, max_digits=8, null=True)
    is_am_shift = models.BooleanField()
    is_patio = models.BooleanField(default=False)
    is_bar = models.BooleanField(default=False)
    support_roles = models.ManyToManyField(Role, related_name='checkouts', through='Checkout_Tipout_Breakdown')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)

    def __str__(self) -> str:
        time = 'AM' if self.is_am_shift else 'PM'
        patio = ' patio' if self.is_patio else ''
        bar = ' bar' if self.is_bar else ''
        return f'{self.date} {time}{patio}{bar}'


class Checkout_Tipout_Breakdown(models.Model):
    checkout_id = models.ForeignKey(Checkout, on_delete=models.PROTECT)
    role_id = models.ForeignKey(Role, on_delete=models.PROTECT)
    total = models.DecimalField(decimal_places=2, max_digits=8)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)


class Employee_Clock_In(models.Model):
    employee_id = models.ForeignKey(Employee, on_delete=models.PROTECT)
    date = models.DateField(gettext('Date'), default=datetime.date.today)
    time_in = models.DateTimeField(null=True)
    time_out = models.DateTimeField(null=True)
    active_role_id = models.ForeignKey(Role, on_delete=models.PROTECT)
    tipout_received = models.DecimalField(decimal_places=2, max_digits=8, null=True)
    is_am = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)

    def __str__(self) -> str:
        AM_PM = 'AM' if self.is_am else 'PM'
        return f'{self.date} {AM_PM} {self.active_role_id.role} {self.employee_id.first_name} {self.employee_id.last_name}'


class Tipout_Formula(models.Model):
    formula_name = models.CharField(max_length=50)
    formula = models.CharField(max_length=255)
    min_sales = models.DecimalField(decimal_places=2, max_digits=8, null=True)
    max_tipout = models.DecimalField(decimal_places=2, max_digits=8, null=True)
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE)
    is_am_formula = models.BooleanField(default=True)
    is_time_based = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.formula_name}'


class Tipout_Variable(models.Model):
    variable = models.CharField(max_length=255)
    tipout_formula_id = models.ForeignKey(
        Tipout_Formula, on_delete=models.CASCADE)
    table_name = models.CharField(max_length=255)
    column_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sheet_cell = models.CharField(default=None, null=True, max_length=10)
    is_uploaded = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.tipout_formula_id.formula_name} {self.variable}'
