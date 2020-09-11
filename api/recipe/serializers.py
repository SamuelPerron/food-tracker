from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.text import slugify

from .models import RecipeCategory, RecipeSubCategory, Recipe, RecipeStep, RecipeIngredient
from ..ingredient.serializers import IngredientServingSerializer, SlimIngredientSerializer
from ..nutritional_values.serializers import NutritionalValuesSerializer
from ..ingredient.models import IngredientServing


class RecipeCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = '__all__'


class RecipeSubCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecipeSubCategory
        fields = '__all__'


class RecipeIngredientSerializer(serializers.HyperlinkedModelSerializer):
    serving = IngredientServingSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'quantity', 'serving']


class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['order', 'content']
        order = 'order'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['pk', 'username']


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True, required=False)
    steps = RecipeStepSerializer(many=True)
    nutritional_values = NutritionalValuesSerializer(required=False, read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        data_for_creation = {
            'author': validated_data['author'],
            'category': validated_data['category'],
            'name': validated_data['name'],
            'preparation_time': validated_data['preparation_time'],
            'cook_time': validated_data['cook_time'],
            'servings': validated_data['servings'],
            'slug': slugify(validated_data['name'])
        }
        recipe = Recipe(**data_for_creation)
        recipe.save()
        for step in validated_data['steps']:
            new_step = RecipeStep(**step)
            new_step.save()
            recipe.steps.add(new_step)
        for ingredient in validated_data['ingredients']:
            new_serving = IngredientServing(**ingredient['serving'])
            new_serving.save()
            ingredient['serving'] = new_serving
            new_ingredient = RecipeIngredient(**ingredient)
            new_ingredient.save()
            recipe.ingredients.add(new_ingredient)
        return recipe


class RecipeBookmarkSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = Recipe
        fields = ['pk', 'name', 'author']
