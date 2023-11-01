from django.test import TestCase
from api.models import Role, Employee


class Test_Role(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
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
        test_employee4.roles.set([test_role1, test_role2])

    def test_employee_content(self):
        employee = Employee.objects.latest('created_at')
        self.assertEqual(employee.first_name, 'Nick')
        self.assertEqual(employee.last_name, 'Arakaki')
        self.assertEqual(str(employee), 'Nick Arakaki')
        self.assertEqual(employee.roles.count(), 2)
        role = Role.objects.latest('created_at')
        employee.roles.set([role])
        self.assertEqual(employee.roles.count(), 1)
        self.assertTrue(employee.roles.filter(pk=role.pk).exists())
