from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password']


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'role', 'description', 'created_at',
                  'updated_at', 'sheet_cell', 'is_uploaded']
