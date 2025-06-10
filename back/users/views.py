from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from . import serializers

class Register(generics.CreateAPIView):
    serializer_class = serializers.Register