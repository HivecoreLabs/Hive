import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from api.serializers import RoleSerializer
from api.models import Role, Employee

class TestRoleViewSet(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        # client = APIClient()
        # user = User.objects.create(username='user', password='password')
        # client.force_authenticate(user=user)

        Role.objects.bulk_create([
            Role(role='Server', description='Description for server.'),
            Role(role='Bartender', description='Description for bartender.'),
            Role(role='Chef', description='Description for chef.'),
            Role(role='Hostess', description='Description for hostess.'),
            Role(role='Manager', description='Description for manager.'),
            Role(role='Busser', description='Description for busser.'),
            Role(role='Watier', description='Description for waiter.'),
            Role(role='Dishwasher', description='Description for dishwasher.'),
            Role(role='Caterer', description='Description for caterer.'),
            Role(role='Doorman', description='Description for doorman.'),
        ])


    def test_get_role_list(self):
        url = reverse('roles-list')
        roles = Role.objects.all()
        response = self.client.get(url)
        serializer_data = RoleSerializer(roles, many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = json.loads(response.content)
        self.assertEqual(data, serializer_data)


    def test_get_single_role_details(self):
        role = Role.objects.get(pk=3)
        serializer_data = RoleSerializer(role).data
        url = reverse('roles-detail', args=[3])
        response = self.client.get(url)
        self.assertEqual(json.loads(response.content), serializer_data)


    def test_create_role(self):
        pass
