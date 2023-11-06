from django.test import TestCase
from api.models import Role, Checkout, Checkout_Tipout_Breakdown, Employee
from django.utils import timezone

class ModelTestCase(TestCase):
    def setUp(self):
        # Create test data
        self.role = Role.objects.create(role="Waiter", description="Test Role")
        self.employee = Employee.objects.create(first_name="John", last_name="Doe")
        self.checkout = Checkout.objects.create(
            net_sales=100.50,
            cash_owed=50.25,
            employee_id=self.employee,
            total_tipout=25.75,
            date=timezone.now(),
            is_uploaded=True,
            is_am_shift = True
        )

        self.checkout_breakdown = Checkout_Tipout_Breakdown.objects.create(checkout_id=self.checkout, role_id=self.role, total=50.00)

    def test_checkout_str(self):
        self.assertEqual(str(self.checkout), f'{self.checkout.date} AM')

    def test_checkout_tipout_breakdown(self):
        breakdown = Checkout_Tipout_Breakdown.objects.create(
            checkout_id=self.checkout,
            role_id=self.role,
            total=10.00
        )
        self.assertEqual(breakdown.checkout_id, self.checkout)
        self.assertEqual(breakdown.role_id, self.role)
        self.assertEqual(breakdown.total, 10.00)

    def test_checkout_tipout_relationship(self):
        # Test the relationship between Checkout and Checkout_Tipout_Breakdown
        self.assertEqual(self.checkout.support_roles.all().count(), 1)
        self.assertEqual(self.checkout.support_roles.first(), self.role)
