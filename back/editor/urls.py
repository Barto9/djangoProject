from django.urls import path
from .views import GDDListCreateView

urlpatterns = [
    path('gdds/', GDDListCreateView.as_view(), name='gdd-list-create'),
]