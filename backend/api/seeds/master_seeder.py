from random import randint, choice, random
from datetime import datetime, timedelta
from api.models import SpreadSheet, Employee, Role, Employee_Role, Checkout, Employee_Clock_In, Tipout_Formula, Tipout_Variable

# Arrays of unique strings
first_names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Hannah", "Ian", "Jane"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Davis", "Garcia", "Martinez", "Jackson", "Moore"]
restaurant_employee_ids = ["EmpID1", "EmpID2", "EmpID3", "EmpID4", "EmpID5", "EmpID6", "EmpID7", "EmpID8", "EmpID9", "EmpID10"]
roles = ["Server", "Bartender", "Chef", "Hostess", "Manager", "Busser", "Waiter", "Dishwasher", "Caterer", "Busser", "Food Runner", "Drink Runner"]

def seed_spreadsheet_data():
    for i in range(10):
        spreadsheet = SpreadSheet(database_google_id=f"google_id_{i}")
        spreadsheet.save()

def seed_employee_data():
    for i in range(10):
        employee = Employee(
            first_name=random.choice(first_names),
            last_name=random.choice(last_names),
            restaurant_employee_id=random.choice(restaurant_employee_ids),
            food_permit_exp=datetime.now() + timedelta(days=random.randint(1, 365)),
            alcohol_permit_exp=datetime.now() + timedelta(days=random.randint(1, 365)),
            is_former_employee=random.choice([True, False]),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            sheet_cell=None,
            is_uploaded=False
        )
        employee.save()

def seed_role_data():
    for i in range(10):
        role = Role(
            role=roles[i],
            description=f"Description for role {i}",
            created_at=datetime.now(),
            updated_at=datetime.now(),
            sheet_cell=None,
            is_uploaded=False
        )
        role.save()

def seed_employee_role_data():
    roles = Role.objects.all()
    employees = Employee.objects.all()
    for i in range(10):
        employee_role = Employee_Role(
            role_id=random.choice(roles),
            employee_id=random.choice(employees),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            sheet_cell=None,
            is_uploaded=False
        )
        employee_role.save()

def seed_checkout_data():
    employees = Employee.objects.all()
    for i in range(10):
        checkout = Checkout(
            net_sales=random.randint(100, 1000),
            cash_owed=random.randint(10, 100),
            employee_id=random.choice(employees),
            total_tipout=random.randint(1, 100),
            is_am_shift=random.choice([True, False]),
            is_patio=random.choice([True, False]),
            is_bar=random.choice([True, False]),
            tipout_day=datetime.now() - timedelta(days=random.randint(1, 365)),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            sheet_cell=None,
            is_uploaded=False
        )
        checkout.save()

def seed_employee_clock_in_data():
    employees = Employee.objects.all()
    roles = Role.objects.all()
    for i in range(10):
        clock_in = Employee_Clock_In(
            employee_id=random.choice(employees),
            time_in=datetime.now() - timedelta(hours=random.randint(1, 12)),
            time_out=datetime.now(),
            active_role_id=random.choice(roles),
            tipout_received=random.randint(1, 50),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            sheet_cell=None,
            is_uploaded=False
        )
        clock_in.save()

def seed_tipout_formula_data():
    roles = Role.objects.all()
    for i in range(10):
        formula = Tipout_Formula(
            formula_name=f"Formula_{i}",
            formula=f"Formula expression {i}",
            role_id=random.choice(roles),
            is_am_formula=random.choice([True, False]),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            sheet_cell=None,
            is_uploaded=False
        )
        formula.save()

def seed_tipout_variable_data():
    formulas = Tipout_Formula.objects.all()
    for i in range(10):
        variable = Tipout_Variable(
            variable=f"Variable_{i}",
            tipout_formula_id=random.choice(formulas),
            table_name=f"Table_{i}",
            column_name=f"Column_{i}",
            created_at=datetime.now(),
            updated_at=datetime.now(),
            sheet_cell=None,
            is_uploaded=False
        )
        variable.save()

# Call the seed functions to populate the database
seed_spreadsheet_data()
seed_employee_data()
seed_role_data()
seed_employee_role_data()
seed_checkout_data()
seed_employee_clock_in_data()
seed_tipout_formula_data()
seed_tipout_variable_data()

