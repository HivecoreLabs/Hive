from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Role, Employee


class Test_Create_Role(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        test_role = Role.objects.create(
            role='Dishwasher', description='Washes the dishes')

    def test_role_content(self):
        role = Role.objects.latest('created_at')
        role_name = f'{role.role}'
        role_description = f'{role.description}'
        self.assertEqual(role_name, 'Dishwasher')
        self.assertEqual(role_description, 'Washes the dishes')
        self.assertEqual(str(role), 'Dishwasher')
