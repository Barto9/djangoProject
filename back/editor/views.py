from rest_framework import generics, permissions
from .models import Note, GDD
from .serializers import NoteSerializer, GDDSerializer  # <-- Use correct serializer names

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer  # <-- Use serializer, not model
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        gdd_id = self.kwargs['gdd_id']
        return Note.objects.filter(gdd__id=gdd_id, gdd__owner=self.request.user)

    def perform_create(self, serializer):
        gdd_id = self.kwargs['gdd_id']
        gdd = GDD.objects.get(id=gdd_id, owner=self.request.user)
        serializer.save(gdd=gdd)

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer  # <-- Use serializer, not model
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        gdd_id = self.kwargs['gdd_id']
        return Note.objects.filter(gdd__id=gdd_id, gdd__owner=self.request.user)

class GDDListCreateView(generics.ListCreateAPIView):
    serializer_class = GDDSerializer  # <-- Use serializer, not model
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GDD.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)