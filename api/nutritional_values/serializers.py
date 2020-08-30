from rest_framework import serializers

from .models import NutritionalValues


class NutritionalValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionalValues
        exclude = ['id', 'ingredient']
