from django.utils import timezone
import datetime
from collections import OrderedDict
from django.test import TestCase
from decimal import Decimal
from api.models import Employee_Clock_In, Employee, Role
from api.serializers import Read_Clock_In_Serializer, Write_Clock_In_Serializer

class EmployeeClockInSerializerTest(TestCase):
    def setUp(self):
        # Create test data for related models
        self.time_in = timezone.now()
        self.time_out = timezone.now()
        self.date = datetime.date.today()

        self.role = Role.objects.create(role="Test Role")

        self.employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
        )

        self.clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            active_role_id=self.role,
            date='2023-11-01',
            is_am=True,
            tipout_received="10.50",
            time_in='2023-11-01T12:00:00.837553Z',
            time_out='2023-11-01T13:00:00.837553Z',
        )

    def test_read_clock_in_serializer(self):
        serializer = Read_Clock_In_Serializer(instance=self.clock_in)
        expected_data = {
            'id': self.clock_in.pk,
            'employee': OrderedDict([('id', self.employee.pk), ('first_name', self.employee.first_name), ('last_name', self.employee.last_name), ('restaurant_employee_id', self.employee.restaurant_employee_id)]),
            'active_role': OrderedDict([('id', self.role.pk), ('role', self.role.role)]),
            'date': '2023-11-01',
            'is_am': True,
            'tipout_received': '10.50',
            'time_in': '2023-11-01T12:00:00.837553Z',
            'time_out': '2023-11-01T13:00:00.837553Z',
            }
        self.assertEqual(serializer.data, expected_data)

    def test_write_clock_in_serializer(self):
        data = {
            'employee_id': self.employee.pk,
            'active_role_id': self.role.pk,
            'date': self.date,
            'is_am': False,
            'tipout_received': '15.25',
            'time_in': self.time_in,
            'time_out': self.time_out,
        }
        serializer = Write_Clock_In_Serializer(data=data)
        self.assertTrue(serializer.is_valid())
        saved_clock_in = serializer.save()
        self.assertEqual(saved_clock_in.employee_id, self.employee)
        self.assertEqual(saved_clock_in.active_role_id, self.role)
        self.assertEqual(saved_clock_in.date, self.date)
        self.assertEqual(saved_clock_in.is_am, False)
        self.assertEqual(saved_clock_in.tipout_received, Decimal('15.25'))
        self.assertEqual(saved_clock_in.time_in, self.time_in)
        self.assertEqual(saved_clock_in.time_out, self.time_out)
