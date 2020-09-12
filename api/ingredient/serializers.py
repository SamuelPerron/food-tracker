from rest_framework import serializers

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
        new_serving = IngredientServing(custom_name='Standard serving', grams=100)
        new_serving.save()
        ingredient.servings.add(new_serving)
        return ingredient

    class Meta:
        model = Ingredient
        exclude = ['author',]


class SlimIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['pk', 'name']
