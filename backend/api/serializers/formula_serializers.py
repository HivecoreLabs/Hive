from rest_framework import serializers
from api.models import Tipout_Formula, Tipout_Variable

class Formula_Variable_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Tipout_Variable
        fields = ('__all__')

class FormulaSerializer(serializers.ModelSerializer):
    # variable serializer here
    variables = Formula_Variable_Serializer(many=True)
    class Meta:
        model = Tipout_Formula
        fields = ('__all__', 'variables')
