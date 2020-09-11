from rest_framework import serializers

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientServing, IngredientBrand
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
    servings = IngredientServingSerializer(many=True)

    class Meta:
        model = Ingredient
        exclude = ['author',]


class SlimIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['pk', 'name']
