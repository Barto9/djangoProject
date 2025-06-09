from django.shortcuts import render, redirect
from rest_framework import generics
from .models import Note
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .serializers import NoteSerializer
def counter_view(request):
    if 'count' not in request.session:
        request.session['count'] = 0
    if request.method == 'POST':
        request.session['count'] += 1

    return render(request, 'counter.html', {'count': request.session['count']})

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
