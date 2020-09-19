from rest_framework import serializers
from django.contrib.auth import get_user_model
from drf_writable_nested import WritableNestedModelSerializer

from .models import Profile


class ProfileSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Profile
        fields = ['avatar', 'bookmarked_recipes',]


class UserSerializer(WritableNestedModelSerializer):
    profile = ProfileSerializer(required=False)
    avatar = serializers.ImageField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['pk', 'profile', 'username', 'email', 'is_staff', 'password', 'avatar']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        avatar = validated_data.pop('avatar')
        user = get_user_model()(**validated_data)
        user.set_password(password)
        user.save()
        user.profile.avatar = avatar
        user.profile.save()
        return user
