from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Role


class RoleTests(APITestCase):

    def test_view_roles(self):

        # neet to setup after getting viewsets
        url = reverse('http://localhost:8000/api/roles')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def create_role(self):

        data = {"role": "Dishwasher"}
        # need to figure out after setting up views
        url = reverse('http://localhost:8000/api/roles')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
