from django.contrib import admin

from .models import RecipeCategory, RecipeSubCategory, Recipe, RecipeIngredient, RecipeStep

@admin.register(RecipeCategory)
class RecipeCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(RecipeSubCategory)
class RecipeSubCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    # Hide page from admin
    def get_model_perms(self, request):
        return {}


@admin.register(RecipeStep)
class RecipeStepAdmin(admin.ModelAdmin):
    # Hide page from admin
    def get_model_perms(self, request):
        return {}


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    pass
