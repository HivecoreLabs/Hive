from django.test import TestCase
from api.models import Employee, Role, Employee_Clock_In
from django.utils import timezone

class EmployeeClockInModelTestCase(TestCase):
    def setUp(self):
        self.employee = Employee.objects.create(
            first_name='John',
            last_name='Doe',
        )
        self.role = Role.objects.create(
            role='Cashier',
            description='Responsible for handling cash transactions',
        )
        self.clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            time_in=timezone.now(),
            time_out=timezone.now(),
            active_role_id=self.role,
            tipout_received=50.00,
            sheet_cell='A1',
            is_uploaded=False,
        )

    def test_employee_clock_in_str(self):
        clock_in = Employee_Clock_In.objects.get(id=self.clock_in.pk)
        expected_str = f'{self.role} {self.employee.first_name} {self.employee.last_name}'
        self.assertEqual(str(clock_in), expected_str)

    def test_employee_clock_in_relationships(self):
        clock_in = Employee_Clock_In.objects.get(id=self.clock_in.pk)
        self.assertEqual(clock_in.employee_id, self.employee)
        self.assertEqual(clock_in.active_role_id, self.role)

    def test_employee_clock_in_defaults(self):
        clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            active_role_id=self.role,
            tipout_received=50.00,
        )
        self.assertIsNone(clock_in.time_in)
        self.assertIsNone(clock_in.time_out)
        self.assertEqual(clock_in.tipout_received, 50.00)
        self.assertIsNone(clock_in.sheet_cell)
        self.assertFalse(clock_in.is_uploaded)
