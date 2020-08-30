from django.db import models

class NutritionalValues(models.Model):
    calories = models.IntegerField(blank=False)
    protein = models.FloatField(blank=False)
    carbs = models.FloatField(blank=False)
    fat = models.FloatField(blank=False)
    saturated_fat = models.FloatField(default=0, blank=True)
    unsaturated_fat = models.FloatField(default=0, blank=True)
    fiber = models.FloatField(default=0, blank=True)
    sugars = models.FloatField(default=0, blank=True)
    sodium = models.FloatField(default=0, blank=True)
    cholesterol = models.FloatField(default=0, blank=True)
    potassium = models.FloatField(default=0, blank=True)

    def __str__(self):
        return f'{self.calories} Calories'
