from django.urls import path
import views

urlpatterns = [
    path('register/', views.Register.as_view(), name='register'),
]