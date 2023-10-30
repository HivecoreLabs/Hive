import datetime
from django.test import TestCase
from django.contrib.auth.models import User
from api.models import SpreadSheet, Role, Employee, Checkout


class Test_Create_Role(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        test_spreadsheet = SpreadSheet.objects.create(database_google_id="DATABASE_ID")

        test_role1 = Role.objects.create(
            role='Waiter', description='Waits on patrons.')
        test_role2 = Role.objects.create(
            role='Busser', description='Cleans tables between patrons.')
        test_role3 = Role.objects.create(
            role='Dishwasher', description='Washes the dishes.')
        test_role4 = Role.objects.create(
            role='Doorman', description='Opens the door for patrons.')

        test_employee1 = Employee.objects.create(first_name="Nygil", last_name="Nettles")
        test_employee2 = Employee.objects.create(first_name="Brandon", last_name="Choi")
        test_employee3 = Employee.objects.create(first_name="Taylor", last_name="Cornwall")
        test_employee4 = Employee.objects.create(first_name="Nick", last_name="Arakaki")

        test_checkout1 = Checkout.objects.create(net_sales=1_234.56, cash_owed=789.57, employee_id=test_employee1, total_tipout=44.49, is_am_shift=True, is_patio=False, is_bar=False, tipout_day=datetime.datetime(2023,10,27))
        test_checkout2 = Checkout.objects.create(net_sales=500, cash_owed=50, employee_id=test_employee2, total_tipout=25, is_am_shift=True, is_patio=False, is_bar=False, tipout_day=datetime.datetime(2023,10,28))
        test_checkout3 = Checkout.objects.create(net_sales=750, cash_owed=75, employee_id=test_employee3, total_tipout=37.5, is_am_shift=True, is_patio=True, is_bar=False, tipout_day=datetime.datetime(2023,10,29))
        test_checkout4 = Checkout.objects.create(net_sales=600, cash_owed=60, employee_id=test_employee4, total_tipout=30, is_am_shift=True, is_patio=False, is_bar=False, tipout_day=datetime.datetime(2023,10,30))

    def test_spreadsheet_content(self):
        spreadsheet = SpreadSheet.objects.latest('pk')
        self.assertEqual(spreadsheet.database_google_id, 'DATABASE_ID')
        self.assertEqual(str(spreadsheet), 'DATABASE_ID')


    def test_role_content(self):
        role = Role.objects.latest('created_at')
        self.assertEqual(role.role, 'Dishwasher')
        self.assertEqual(role.description, 'Washes the dishes.')
        self.assertEqual(str(role), 'Dishwasher')

    def test_employee_content(self):
        employee = Employee.objects.latest('created_at')
        self.assertEqual(employee.first_name, 'Nick')
        self.assertEqual(employee.last_name, 'Arakaki')
        self.assertEqual(str(employee), 'Nick Arakaki')
        self.assertEqual(employee.roles.count(), 0)
        role = Role.objects.latest('created_at')
        employee.roles.set([role])
        self.assertEqual(employee.roles.count(), 1)
        self.assertTrue(employee.roles.filter(pk=role.pk).exists())

    def test_checkout(self):
        checkout1 = Checkout.objects.get(pk=1)
        employee = Employee.objects.get(pk=1)
        self.assertEqual(checkout1.employee_id, employee)
        self.assertEqual(str(checkout1), '2023-10-27 00:00:00+00:00 AM')
