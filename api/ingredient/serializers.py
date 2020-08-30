from rest_framework import serializers

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientServing, IngredientBrand


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


class IngredientSerializer(serializers.ModelSerializer):
    category = IngredientSubCategorySerializer()
    brand = IngredientBrandSerializer()

    class Meta:
        model = Ingredient
        fields = '__all__'


class IngredientServingSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()

    class Meta:
        model = IngredientServing
        fields = '__all__'
