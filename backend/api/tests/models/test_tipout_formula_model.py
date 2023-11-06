from django.test import TestCase
from api.models import Tipout_Formula, Role

class TipoutFormulaModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a sample Role for testing ForeignKey
        role = Role.objects.create(role="Sample Role")
        Tipout_Formula.objects.create(
            formula_name="Test Formula",
            formula="1 + 2",
            role_id=role
        )

    def test_formula_name_max_length(self):
        formula = Tipout_Formula.objects.get(id=1)
        max_length = formula._meta.get_field('formula_name').max_length
        self.assertLessEqual(len(formula.formula_name), max_length)

    def test_formula_max_length(self):
        formula = Tipout_Formula.objects.get(id=1)
        max_length = formula._meta.get_field('formula').max_length
        self.assertLessEqual(len(formula.formula), max_length)

    def test_role_id_foreign_key(self):
        formula = Tipout_Formula.objects.get(id=1)
        role = formula.role_id
        self.assertEqual(role.role, "Sample Role")

    def test_is_am_formula_default_value(self):
        formula = Tipout_Formula.objects.get(id=1)
        self.assertTrue(formula.is_am_formula)

    def test_is_uploaded_default_value(self):
        formula = Tipout_Formula.objects.get(id=1)
        self.assertFalse(formula.is_uploaded)

    def test_created_at_auto_now_add(self):
        formula = Tipout_Formula.objects.get(id=1)
        self.assertIsNotNone(formula.created_at)

    def test_updated_at_auto_now(self):
        formula = Tipout_Formula.objects.get(id=1)
        self.assertIsNotNone(formula.updated_at)

    def test_str_method(self):
        formula = Tipout_Formula.objects.get(id=1)
        self.assertEqual(str(formula), "Test Formula")
