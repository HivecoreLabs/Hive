from django.test import TestCase
from api.models import Role


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


    def test_role_content(self):
        role = Role.objects.latest('created_at')
        self.assertEqual(role.role, 'Doorman')
        self.assertEqual(role.description, 'Opens the door for patrons.')
        self.assertEqual(str(role), 'Doorman')
