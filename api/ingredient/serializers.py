from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientServing, IngredientBrand
from ..nutritional_values.models import NutritionalValues
from ..nutritional_values.serializers import NutritionalValuesSerializer


class IngredientCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientCategory
        fields = '__all__'


class IngredientSubCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IngredientSubCategory
        fields = '__all__'


class IngredientBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientBrand
        fields = '__all__'


class IngredientServingSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientServing
        exclude = ['ingredient']


class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    nutritional_values = NutritionalValuesSerializer(many=True)
    servings = IngredientServingSerializer(many=True, required=False)
    serving_type = serializers.CharField(write_only=True)
    serving_name = serializers.CharField(write_only=True)
    serving_size = serializers.FloatField(write_only=True)
    author = serializers.PrimaryKeyRelatedField(write_only=True, queryset=get_user_model().objects.all())

    def create(self, validated_data):
        data_for_creation = {
            'category': validated_data['category'],
            'name': validated_data['name'].lower(),
        }
        ingredient = Ingredient(**data_for_creation)
        ingredient.save()
        for nv in validated_data['nutritional_values']:
            new_nv = NutritionalValues(**nv)
            new_nv.save()
            ingredient.nutritional_values.add(new_nv)
        grams = 0
        milliliters = 0
        if validated_data['serving_type'] == 'grams':
            grams = validated_data['serving_size']
        else:
            milliliters = validated_data['serving_size']
        new_serving = IngredientServing(for_list_name=validated_data['serving_name'], grams=grams, milliliters=milliliters)
        new_serving.save()
        ingredient.servings.add(new_serving)
        return ingredient

    class Meta:
        model = Ingredient
        fields = '__all__'


class SlimIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['pk', 'name']
