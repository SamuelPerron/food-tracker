from rest_framework import serializers

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientServing, IngredientBrand
from ..nutritional_values.serializers import NutritionalValuesSerializer


class IngredientCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientCategory
        fields = '__all__'


class IngredientSubCategorySerializer(serializers.ModelSerializer):
    parent_category = IngredientCategorySerializer()

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
        exclude = ['id', 'ingredient']


class IngredientSerializer(serializers.ModelSerializer):
    category = IngredientSubCategorySerializer()
    brand = IngredientBrandSerializer()
    servings = IngredientServingSerializer(many=True)
    nutritional_values = NutritionalValuesSerializer(many=True)

    class Meta:
        model = Ingredient
        fields = '__all__'
        exclude = ['author',]


class SlimIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['pk', 'name']
