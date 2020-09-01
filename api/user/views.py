from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username',]
