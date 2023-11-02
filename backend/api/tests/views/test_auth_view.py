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


    def test_valid_new_user_signup(self) -> None:
        url = reverse('signup')
        response = self.client.post(url, {
            'username': 'Brandon',
            'password': 'password'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user_data = User.objects.get(username='Brandon')
        user_token = Token.objects.get(user=user_data)
        serializer_data = UserSerializer(user_data).data
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


    def test_valid_user_login(self) -> None:
        signup_url = reverse('signup')
        login_url = reverse('login')
        self.client.post(signup_url, {
            'username': 'Nygil',
            'password': 'password'
        })
        response = self.client.post(login_url, {
            'username': 'Nygil',
            'password': 'password'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        user = User.objects.get(username='Nygil')
        serializer_data = UserSerializer(user).data
        user_token = Token.objects.get(user=user).key
        self.assertEqual(json.loads(response.content), {
            'token': user_token,
            'user': {
                'id': serializer_data['id'],
                'username': serializer_data['username'],
            }
        })


    def test_invalid_credential_login(self):
        # create user with hashed password
        self.client.post(reverse('signup'), {
            'username': 'Nygil',
            'password': 'password'
        })

        url = reverse('login')
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'username': ['This field is required.'], 'password': ['This field is required.']})

        response = self.client.post(url, {'username': 'Nygil'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'password': ['This field is required.']})

        response = self.client.post(url, {'password': 'password'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), {'username': ['This field is required.']})

        response = self.client.post(url, {
            'username': 'Nigil',
            'password': 'password'
        })
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(json.loads(response.content), {'detail': 'Not found.'})

        response = self.client.post(url, {
            'username': 'Nygil',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(json.loads(response.content), {'detail': 'Not found.'})
