# Generated by Django 3.1 on 2020-08-30 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0002_auto_20200830_1442'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipeingredient',
            name='recipe',
        ),
        migrations.RemoveField(
            model_name='recipestep',
            name='recipe',
        ),
        migrations.AddField(
            model_name='recipe',
            name='steps',
            field=models.ManyToManyField(null=True, to='recipe.RecipeStep'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='ingredients',
            field=models.ManyToManyField(null=True, to='recipe.RecipeIngredient'),
        ),
    ]