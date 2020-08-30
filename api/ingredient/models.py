from django.db import models


class IngredientCategory(models.Model):
    name = models.CharField(max_length=25, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'


class IngredientSubCategory(models.Model):
    name = models.CharField(max_length=50, null=True)
    parent_category = models.ForeignKey(IngredientCategory, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.parent_category.name} - {self.name}'

    class Meta:
        verbose_name = 'sub-category'
        verbose_name_plural = 'sub-categories'


class IngredientBrand(models.Model):
    name = models.CharField(max_length=100, null=True)
    image = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'brand'


class Ingredient(models.Model):
    name = models.CharField(max_length=150, null=True)
    image = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(IngredientSubCategory, on_delete=models.CASCADE, null=True)
    brand = models.ForeignKey(IngredientBrand, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class IngredientServing(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, null=True)
    custom_name = models.CharField(max_length=25, null=True)
    grams = models.IntegerField(default=0)
    milliliters = models.IntegerField(default=0)
