from rest_framework import serializers
from api.models import Checkout, Checkout_Tipout_Breakdown

class TipoutBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout_Tipout_Breakdown
        exclude = ('created_at', 'updated_at', 'sheet_cell', 'is_uploaded')


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        exclude = ('created_at', 'updated_at', 'sheet_cell', 'is_uploaded')


class ReadCheckoutSerializer(serializers.ModelSerializer):
    checkout_tipout_breakdowns = TipoutBreakdownSerializer(source='checkout_tipout_breakdown_set', many=True, read_only=True)

    class Meta:
        model= Checkout
        exclude = ('created_at', 'updated_at', 'sheet_cell', 'is_uploaded')
