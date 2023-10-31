import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from api.serializers import EmployeeSerializer
from api.models import Role, Employee

class TestRoleViewSet(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        client = APIClient()
        user = User.objects.create(username='user', password='password')
        client.force_authenticate(user=user)

        Role.objects.bulk_create([
            Role(role='Server', description='Description for server.'),
            Role(role='Bartender', description='Description for bartender.'),
            Role(role='Chef', description='Description for chef.'),
            Role(role='Hostess', description='Description for hostess.'),
            Role(role='Manager', description='Description for manager.'),
            Role(role='Busser', description='Description for busser.'),
            Role(role='Watier', description='Description for waiter.'),
            Role(role='Dishwasher', description='Description for dishwasher.'),
            Role(role='Caterer', description='Description for caterer.'),
            Role(role='Doorman', description='Description for doorman.'),
        ])

        Employee.objects.bulk_create([
            Employee(first_name='Nick', last_name='Arakaki'),
            Employee(first_name='Nygil', last_name='Nettles'),
            Employee(first_name='Taylor', last_name='Cornwall'),
            Employee(first_name='Brandon', last_name='Choi'),
        ])


    def test_get_employee_list(self) -> None:
        url = reverse('employees-list')
        employees = Employee.objects.all()
        serializer_data = EmployeeSerializer(employees, many=True).data

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), serializer_data)



    def test_get_single_employee_details(self):
        url = reverse('employees-detail', args=[1])
        employee = Employee.objects.get(pk=1)
        serializer_data = EmployeeSerializer(employee).data

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), serializer_data)


    def test_create_employee_valid_data(self):
        pass


    def test_create_employee_invalid_data(self):
        pass


    def update_employee_valid_data(self):
        pass


    def update_employee_invalid_data(self):
        pass
