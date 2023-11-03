from rest_framework import serializers
from api.models import Tipout_Formula, Tipout_Variable

class FormulaVariableSerializer(serializers.ModelSerializer):
    parent_lookup_kwargs = {
        'formula_pk': 'formula_pk'
    }

    class Meta:
        model = Tipout_Variable
        fields = ('__all__')

class WriteFormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipout_Formula
        fields = ('__all__')

class ReadFormulaSerializer(serializers.ModelSerializer):
    # variable serializer here
    tipout_variables = FormulaVariableSerializer(many=True, source='tipout_variable_set')
    class Meta:
        model = Tipout_Formula
        fields = '__all__'
