from django.test import TestCase
from api.models import Role, Tipout_Variable, Tipout_Formula

class TipoutVariableModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a sample Tipout_Formula for ForeignKey relationship
        role = Role.objects.create(role="Sample Role")
        formula = Tipout_Formula.objects.create(
            formula_name="Test Formula",
            formula="1 + 2",
            role_id=role
        )
        Tipout_Variable.objects.create(
            variable="Test Variable",
            tipout_formula_id=formula,
            table_name="Test Table",
            column_name="Test Column"
        )

    def test_variable_max_length(self):
        variable = Tipout_Variable.objects.get(id=1)
        max_length = variable._meta.get_field('variable').max_length
        self.assertLessEqual(len(variable.variable), max_length)

    def test_tipout_formula_id_foreign_key(self):
        variable = Tipout_Variable.objects.get(id=1)
        formula = variable.tipout_formula_id
        self.assertEqual(formula.formula_name, "Test Formula")

    def test_table_name_max_length(self):
        variable = Tipout_Variable.objects.get(id=1)
        max_length = variable._meta.get_field('table_name').max_length
        self.assertLessEqual(len(variable.table_name), max_length)

    def test_column_name_max_length(self):
        variable = Tipout_Variable.objects.get(id=1)
        max_length = variable._meta.get_field('column_name').max_length
        self.assertLessEqual(len(variable.column_name), max_length)

    def test_is_uploaded_default_value(self):
        variable = Tipout_Variable.objects.get(id=1)
        self.assertFalse(variable.is_uploaded)

    def test_created_at_auto_now_add(self):
        variable = Tipout_Variable.objects.get(id=1)
        self.assertIsNotNone(variable.created_at)

    def test_updated_at_auto_now(self):
        variable = Tipout_Variable.objects.get(id=1)
        self.assertIsNotNone(variable.updated_at)

    def test_str_method(self):
        variable = Tipout_Variable.objects.get(id=1)
        self.assertEqual(str(variable), "Test Formula Test Variable")
