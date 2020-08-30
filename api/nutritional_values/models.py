from django.db import models

class NutritionalValues(models.Model):
    calories = models.IntegerField(blank=False)
    protein = models.FloatField(blank=False)
    carbs = models.FloatField(blank=False)
    fat = models.FloatField(blank=False)
    saturated_fat = models.FloatField(default=0)
    unsaturated_fat = models.FloatField(default=0)
    fiber = models.FloatField(default=0)
    sugars = models.FloatField(default=0)
    sodium = models.FloatField(default=0)
    cholesterol = models.FloatField(default=0)
    potassium = models.FloatField(default=0)
