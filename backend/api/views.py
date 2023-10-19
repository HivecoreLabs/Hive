from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
    person = {'name': "Restaurant App", "description": "Making managers lives easier"}
    return Response(person)

# Create your views here.
