import json
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from api.serializers import UserSerializer

class Test_Auth_Views(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        user = User.objects.create(
            username='Nick',
            password='password'
        )


    def test_new_user_signup(self) -> None:
        url = reverse('signup')
        response = self.client.post(url, {
            'username': 'Brandon',
            'password': 'password'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user_data = User.objects.get(username='Brandon')
        serializer_data = UserSerializer(user_data).data
        user_token = Token.objects.get(user_id=serializer_data['id'])
        expected_response = {
            'token': user_token.key,
            'user': {
                'id': serializer_data['id'],
                'username': serializer_data['username']
            }
        }
        self.assertEqual(json.loads(response.content), expected_response)


    def test_invalid_user_signup(self) -> None:
        url = reverse('signup')
        response = self.client.post(url, {
            'username': 'Nick',
            'password': 'password'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'username': ['A user with that username already exists.']})


    def test_user_login(self) -> None:
        pass

class Test_Role_ViewSet:
    pass


class Test_Employee_ViewSet:
    pass
