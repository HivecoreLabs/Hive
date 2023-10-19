from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
    person = {'Name': "Nick", "age": 28}
    return Response(person)

# Create your views here.
