from django.test import TestCase
from django.utils import timezone
from datetime import date
from decimal import Decimal
from api.models import Employee, Employee_Role, Employee_Clock_In, Role

class EmployeeClockInModelTest(TestCase):
    def setUp(self) -> None:
        # Create test data for related models
        self.role = Role.objects.create(role="Test Role")
        self.employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
        )
        self.employee_role = Employee_Role.objects.create(
            role_id=self.role,
            employee_id=self.employee,
        )

    def test_employee_clock_in_creation(self) -> None:
        clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            date=date.today(),
            time_in=timezone.now(),
            time_out=timezone.now(),
            active_role_id=self.role,
            tipout_received=10.5,
            is_am=True,
        )
        self.assertIsInstance(clock_in, Employee_Clock_In)
        self.assertEqual(clock_in.employee_id, self.employee)
        self.assertEqual(clock_in.active_role_id, self.role)

    def test_employee_clock_in_str_representation(self) -> None:
        clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            date=date.today(),
            time_in=timezone.now(),
            time_out=timezone.now(),
            active_role_id=self.role,
            tipout_received=10.5,
            is_am=True,
        )
        expected_str = f'{date.today()} AM {self.role.role} {self.employee.first_name} {self.employee.last_name}'
        self.assertEqual(str(clock_in), expected_str)

    def test_employee_clock_in_query(self) -> None:
        clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            date=date.today(),
            time_in=timezone.now(),
            time_out=timezone.now(),
            active_role_id=self.role,
            tipout_received=10.5,
            is_am=True,
        )
        queried_clock_in = Employee_Clock_In.objects.get(id=clock_in.pk)
        self.assertEqual(queried_clock_in, clock_in)

    def test_employee_clock_in_update(self) -> None:
        clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            date=date.today(),
            time_in=timezone.now(),
            time_out=timezone.now(),
            active_role_id=self.role,
            tipout_received=10.5,
            is_am=True,
        )
        new_tipout_received = Decimal('15.05')
        clock_in.tipout_received = new_tipout_received
        clock_in.save()
        updated_clock_in = Employee_Clock_In.objects.get(id=clock_in.pk)
        self.assertEqual(updated_clock_in.tipout_received, new_tipout_received)

    def test_employee_clock_in_defaults(self) -> None:
        clock_in = Employee_Clock_In.objects.create(
            employee_id=self.employee,
            active_role_id=self.role
        )
        self.assertEqual(clock_in.date, date.today())
        self.assertIsNone(clock_in.time_in, )
        self.assertIsNone(clock_in.time_out, )
        self.assertIsNone(clock_in.tipout_received, )
        self.assertTrue(clock_in.is_am)
        self.assertIsNone(clock_in.sheet_cell)
        self.assertFalse(clock_in.is_uploaded)
