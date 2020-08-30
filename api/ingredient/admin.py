from django.contrib import admin
from django import forms
from django.db.models import Q

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientBrand, IngredientServing
from ..nutritional_values.admin import NutritionalValuesInline


class IngredientServingInline(admin.TabularInline):
    model = IngredientServing
    min_num = 1
    extra = 0


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    inlines = (IngredientServingInline, NutritionalValuesInline)


@admin.register(IngredientCategory)
class IngredientCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(IngredientSubCategory)
class IngredientSubCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(IngredientBrand)
class IngredientBrandAdmin(admin.ModelAdmin):
    pass
    