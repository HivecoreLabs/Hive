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



    def test_get_single_employee_details(self) -> None:
        url = reverse('employees-detail', args=[1])
        employee = Employee.objects.get(pk=1)
        serializer_data = EmployeeSerializer(employee).data

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), serializer_data)


    def test_create_employee_valid_data(self) -> None:
        url = reverse('employees-list')
        roles = ['Bartender', 'Dishwasher', 'Not Existing Role']
        new_employee = {
            'first_name': 'Test',
            'last_name': 'Employee',
            'roles': roles
        }

        response = self.client.post(url, new_employee, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        newest_employee = Employee.objects.all().latest('pk')
        serializer_data = EmployeeSerializer(newest_employee).data
        data = json.loads(response.content)
        self.assertEqual(data, serializer_data)
        self.assertEqual(len(data['roles']), 2)
        self.assertEqual(len(data['roles']), 2)
        self.assertEqual(data['first_name'], 'Test')
        self.assertEqual(data['last_name'], 'Employee')


    def test_create_employee_invalid_data(self) -> None:
        url = reverse('employees-list')

        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'first_name': ['This field is required.'], 'last_name': ['This field is required.']})

        blank_fields = {
            'first_name': '',
            'last_name': ''
        }
        response = self.client.post(url, blank_fields, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'first_name': ['This field may not be blank.'], 'last_name': ['This field may not be blank.']})


    def test_update_employee_valid_data(self) -> None:
        url = reverse('employees-detail', args=[1])
        employee = Employee.objects.get(pk=1)
        bartender = Role.objects.get(role='Bartender')
        employee.roles.set([bartender])
        serializer_data = EmployeeSerializer(employee).data
        self.assertEqual(len(serializer_data['roles']), 1)
        update_data = {
            'first_name': 'New Test',
            'last_name': 'New Employee',
            'roles': ['Bartender', 'Dishwasher']
        }

        response = self.client.put(url, update_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)
        updated_employee = Employee.objects.all().latest('updated_at')
        serializer_data = EmployeeSerializer(updated_employee).data
        self.assertEqual(response_data, serializer_data)
        self.assertEqual(len(response_data['roles']), 2)
        self.assertEqual(response_data['first_name'], 'New Test')
        self.assertEqual(response_data['last_name'], 'New Employee')


    def test_update_employee_invalid_data(self) -> None:
        url = reverse('employees-detail', args=[1])
        response = self.client.put(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'first_name': ['This field is required.'], 'last_name': ['This field is required.']})

        blank_inputs = {
            'first_name': '',
            'last_name': ''
        }
        response = self.client.put(url, blank_inputs)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'first_name': ['This field may not be blank.'], 'last_name': ['This field may not be blank.']})

        url = reverse('employees-detail', args=[1000])
        response = self.client.put(url,{'first_name': 'Test', 'last_name': 'User'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(json.loads(response.content), {'detail': 'Not found.'})
