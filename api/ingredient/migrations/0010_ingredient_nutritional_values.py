# Generated by Django 3.1 on 2020-08-30 16:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nutritional_values', '0001_initial'),
        ('ingredient', '0009_auto_20200830_1514'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='nutritional_values',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='nutritional_values.nutritionalvalues'),
        ),
    ]
