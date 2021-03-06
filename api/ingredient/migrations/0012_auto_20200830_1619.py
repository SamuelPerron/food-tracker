# Generated by Django 3.1 on 2020-08-30 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0011_auto_20200830_1616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredientserving',
            name='custom_name',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='ingredientserving',
            name='grams',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='ingredientserving',
            name='milliliters',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
