from rest_framework import serializers

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientServing, IngredientBrand


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['pk']


class IngredientCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientCategory
        fields = ['pk']


class IngredientSubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientSubCategory
        fields = ['pk']


class IngredientServingSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientServing
        fields = ['pk']


class IngredientBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientBrand
        fields = ['pk']
