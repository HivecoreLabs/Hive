from rest_framework import serializers
from api.models import SpreadSheet

class SpreadSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpreadSheet
        fields = '__all__'
