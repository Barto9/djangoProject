from django.urls import path
import views
from rest_framework_simplejwt.views import (
TokenObtainPairView,
TokenRefreshView,
)

urlpatterns = [
    path('register/', views.Register.as_view(), name='register'),
    path('login/', TokenObtainPairView, name='token_obtain_pair'),
    path('token/', TokenRefreshView.as_view(), name='token_refresh'),
]