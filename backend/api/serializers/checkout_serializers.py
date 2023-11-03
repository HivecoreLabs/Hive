from rest_framework import serializers
from api.models import Checkout, Checkout_Tipout_Breakdown

class TipoutBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout_Tipout_Breakdown
        fields = ('all')

class CheckoutSerializer(serializers.ModelSerializer):

    # tipout_breakdowns = TipoutBreakdownSerializer(many=True)
    class Meta:
        model = Checkout
        fields = ('__all__')
