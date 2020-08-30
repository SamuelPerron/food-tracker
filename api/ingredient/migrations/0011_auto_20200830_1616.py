# Generated by Django 3.1 on 2020-08-30 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0010_ingredient_nutritional_values'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredientserving',
            name='ingredient',
        ),
        migrations.AddField(
            model_name='ingredient',
            name='servings',
            field=models.ManyToManyField(to='ingredient.IngredientServing'),
        ),
    ]
