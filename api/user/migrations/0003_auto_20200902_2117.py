# Generated by Django 3.1 on 2020-09-02 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0011_recipe_slug'),
        ('user', '0002_auto_20200830_1528'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='bookmarked_recipes',
            field=models.ManyToManyField(blank=True, to='recipe.Recipe'),
        ),
    ]
