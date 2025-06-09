from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from . import serialisers

class Register(generics.CreateAPIView):
    serializer_class = serialisers.Register