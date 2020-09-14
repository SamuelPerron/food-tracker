from urllib.parse import urlparse

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.urls import resolve

from .models import RecipeCategory, RecipeSubCategory, Recipe, RecipeStep, RecipeIngredient
from ..ingredient.serializers import IngredientServingSerializer, SlimIngredientSerializer
from ..nutritional_values.serializers import NutritionalValuesSerializer
from ..ingredient.models import IngredientServing, Ingredient


class RecipeCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = '__all__'


class RecipeSubCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecipeSubCategory
        fields = '__all__'


class RecipeIngredientNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name',]


class RecipeIngredientSerializer(serializers.HyperlinkedModelSerializer):
    serving = IngredientServingSerializer()
    ingredient_name = RecipeIngredientNameSerializer(source='ingredient', read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'quantity', 'serving', 'ingredient_name']


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
    ingredients_post = serializers.JSONField(write_only=True)
    steps = RecipeStepSerializer(many=True, required=False)
    steps_post = serializers.JSONField(write_only=True)
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
            'image': validated_data['image'],
            'slug': slugify(validated_data['name'])
        }
        recipe = Recipe(**data_for_creation)
        recipe.save()
        for step in validated_data['steps_post']:
            new_step = RecipeStep(**step)
            new_step.save()
            recipe.steps.add(new_step)
        for ingredient in validated_data['ingredients_post']:
            new_serving = IngredientServing(**ingredient['serving'])
            new_serving.save()
            ingredient['serving'] = new_serving
            ingredient_pk = resolve(urlparse(ingredient['ingredient']).path).kwargs['pk']
            ingredient['ingredient'] = Ingredient.objects.get(pk=ingredient_pk)
            ingredient.pop('ingredient_name')
            new_ingredient = RecipeIngredient(**ingredient)
            new_ingredient.save()
            recipe.ingredients.add(new_ingredient)
        return recipe


class RecipeBookmarkSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = Recipe
        fields = ['pk', 'name', 'author']
