from django.test import TestCase
from api.models import Tipout_Formula, Tipout_Variable, Role
from api.serializers import FormulaVariableSerializer, WriteFormulaSerializer, ReadFormulaSerializer

class FormulaVariableSerializerTest(TestCase):
    def test_formula_variable_serializer(self):
        role = Role.objects.create(role="Sample Role")
        formula = Tipout_Formula.objects.create(
            formula_name="Test Formula",
            formula="1 + 2",
            role_id=role
        )
        variable = Tipout_Variable.objects.create(
            variable="Test Variable",
            tipout_formula_id=formula,
            table_name="Test Table",
            column_name="Test Column"
        )

        serializer = FormulaVariableSerializer(variable)

        self.assertEqual(serializer.data['variable'], "Test Variable")
        self.assertEqual(serializer.data['tipout_formula_id'], formula.id)
        self.assertEqual(serializer.data['table_name'], "Test Table")
        self.assertEqual(serializer.data['column_name'], "Test Column")
        self.assertEqual(serializer.data['is_uploaded'], False)

class WriteFormulaSerializerTest(TestCase):
    def test_write_formula_serializer(self):
        role = Role.objects.create(role="Sample Role")
        data = {
            'formula_name': "Test Formula",
            'formula': "1 + 2",
            'role_id': role.pk,
        }

        serializer = WriteFormulaSerializer(data=data)
        self.assertTrue(serializer.is_valid(raise_exception=True))
        formula = serializer.save()

        self.assertEqual(formula.formula_name, "Test Formula")
        self.assertEqual(formula.formula, "1 + 2")
        self.assertEqual(formula.role_id, role)
        self.assertTrue(formula.is_am_formula)
        self.assertIsNone(formula.sheet_cell)
        self.assertFalse(formula.is_uploaded)

class ReadFormulaSerializerTest(TestCase):
    def test_read_formula_serializer(self):
        role = Role.objects.create(role="Sample Role")
        formula = Tipout_Formula.objects.create(
            formula_name="Test Formula",
            formula="1 + 2",
            role_id=role
        )
        variable = Tipout_Variable.objects.create(
            variable="Test Variable",
            tipout_formula_id=formula,
            table_name="Test Table",
            column_name="Test Column"
        )

        serializer = ReadFormulaSerializer(formula)

        self.assertEqual(serializer.data['formula_name'], "Test Formula")
        self.assertEqual(serializer.data['formula'], "1 + 2")
        self.assertIsNone(serializer.data['role_id'])
        self.assertTrue(serializer.data['is_am_formula'])
        self.assertEqual(serializer.data['sheet_cell'], "A1")
        self.assertTrue(serializer.data['is_uploaded'])
        self.assertEqual(serializer.data['tipout_variables'][0]['variable'], "Test Variable")
        self.assertEqual(serializer.data['tipout_variables'][0]['table_name'], "Test Table")
        self.assertEqual(serializer.data['tipout_variables'][0]['column_name'], "Test Column")
        self.assertEqual(serializer.data['tipout_variables'][0]['sheet_cell'], "B2")
        self.assertFalse(serializer.data['tipout_variables'][0]['is_uploaded'])
