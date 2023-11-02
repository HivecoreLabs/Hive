from rest_framework import serializers
from api.models import Tipout_Formula, Tipout_Variable

class FormulaVariableSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tipout_Variable
        fields = ('__all__')

class FormulaSerializer(serializers.ModelSerializer):
    # variable serializer here
    tipout_variables = FormulaVariableSerializer(many=True, source='tipout_variable_set')
    class Meta:
        model = Tipout_Formula
        fields = ('__all__')
