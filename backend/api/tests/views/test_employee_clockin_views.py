import json
import datetime
from django.test import TestCase
from django.urls import reverse
from decimal import Decimal
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from api.models import Employee_Clock_In, Employee, Role
from api.serializers import Read_Clock_In_Serializer, Write_Clock_In_Serializer

class ClockInViewSetTest(APITestCase):
    def setUp(self) -> None:
        self.test_role = Role.objects.create(role='Busser')
        self.test_employee = Employee.objects.create(first_name='test', last_name='employee')
        self.test_clock_in = Employee_Clock_In.objects.create(
            employee_id=self.test_employee,
            active_role_id=self.test_role,
            date='2023-10-31',
            is_am=False
        )


    def test_create_clock_in(self) -> None:
        url = reverse('clock-ins-list')
        clock_in_data = {
            'employee_id': 1,
            'active_role_id': 1,
            'date': '2023-11-01',
            'is_am': True,
            'tipout_received': '10.50',
            'time_in': '2023-11-01T12:00:00.837553',
            'time_out': '2023-11-01T13:00:00.837553',
        }
        response = self.client.post(url, clock_in_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee_Clock_In.objects.count(), 2)

        clock_in = Employee_Clock_In.objects.latest('created_at')
        self.assertEqual(clock_in.employee_id, self.test_employee)
        self.assertEqual(clock_in.active_role_id, self.test_role)
        self.assertEqual(clock_in.date, datetime.date(2023, 11, 1))
        self.assertTrue(clock_in.is_am)
        self.assertEqual(clock_in.tipout_received, Decimal('10.50'))

    def test_list_clock_ins(self) -> None:
        url = reverse('clock-ins-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(json.loads(response.content)), 1)

    def test_retrieve_clock_in(self) -> None:
        url = reverse('clock-ins-detail', args=[1])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['id'], 1)
        self.assertEqual(response_data['employee']['first_name'], 'test')
        self.assertEqual(response_data['employee']['last_name'], 'employee')
        self.assertEqual(response_data['active_role']['role'], 'Busser')
        self.assertFalse(response_data['is_am'])

    def test_update_clock_in(self) -> None:
        url = reverse('clock-ins-detail', args=[1])
        updated_data = {
            'employee_id': 1,
            'active_role_id': 1,
            'tipout_received': '15.25'
            }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Employee_Clock_In.objects.get(id=1).tipout_received, Decimal('15.25'))

    # def test_delete_clock_in(self) -> None:
    #     clock_in = Employee_Clock_In.objects.create(**self.clock_in_data)
    #     response = self.client.delete(f'/clock-ins/{clock_in.id}/')
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    #     self.assertEqual(Employee_Clock_In.objects.count(), 0)

class EmployeeClockInViewSetTest(TestCase):
    def setUp(self) -> None:
        self.test_role = Role.objects.create(role='Busser')
        self.test_employee1 = Employee.objects.create(first_name='test', last_name='employee')
        self.test_employee2 = Employee.objects.create(first_name='test2', last_name='employee2')
        self.test_clock_in1 = Employee_Clock_In.objects.create(
            employee_id=self.test_employee1,
            active_role_id=self.test_role,
            date='2023-10-31',
            is_am=False
        )
        self.test_clock_in2 = Employee_Clock_In.objects.create(
            employee_id=self.test_employee2,
            active_role_id=self.test_role,
            date='2023-11-01',
            is_am=False
        )

    def test_list_employee_clock_ins(self) -> None:
        url = reverse('employee-clock-ins-list', args=[1])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = json.loads(response.content)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['employee']['first_name'], 'test')
        self.assertEqual(data[0]['date'], '2023-10-31')

class RoleClockInViewSetTest(TestCase):
    def setUp(self) -> None:
        self.test_role1 = Role.objects.create(role='Busser')
        self.test_role2 = Role.objects.create(role='Waiter')
        self.test_employee = Employee.objects.create(first_name='test', last_name='employee')
        self.test_clock_in1 = Employee_Clock_In.objects.create(
            employee_id=self.test_employee,
            active_role_id=self.test_role1,
            date='2023-10-10',
            is_am=False
        )
        self.test_clock_in2 = Employee_Clock_In.objects.create(
            employee_id=self.test_employee,
            active_role_id=self.test_role2,
            date='2023-11-01',
            is_am=False
        )

    def test_list_role_clock_ins(self) -> None:
        url = reverse('role-clock-ins-list', args=[1])
        response = self.client.get(url)  # Replace '1' with a valid role ID
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = json.loads(response.content)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['active_role']['role'], 'Busser')
        self.assertEqual(data[0]['date'], '2023-10-10')
