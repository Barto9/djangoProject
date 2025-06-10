from rest_framework import generics, permissions
from .models import GDD
from .serializers import GDDs

class GDDListCreateView(generics.ListCreateAPIView):
    serializer_class = GDDs
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GDD.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)