from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username',]

    @action(detail=False, methods=['get'])
    def user_by_token(self, request):
        queryset = Token.objects.all()
        token = get_object_or_404(queryset, key=request.query_params['token'])
        user = token.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
