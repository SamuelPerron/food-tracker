# Generated by Django 3.1 on 2020-08-30 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0006_auto_20200830_1428'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='ingredientbrand',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
