# Generated by Django 3.1 on 2020-08-30 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NutritionalValues',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calories', models.IntegerField()),
                ('protein', models.FloatField()),
                ('carbs', models.FloatField()),
                ('fat', models.FloatField()),
                ('saturated_fat', models.FloatField(default=0)),
                ('unsaturated_fat', models.FloatField(default=0)),
                ('fiber', models.FloatField(default=0)),
                ('sugars', models.FloatField(default=0)),
                ('sodium', models.FloatField(default=0)),
                ('cholesterol', models.FloatField(default=0)),
                ('potassium', models.FloatField(default=0)),
            ],
        ),
    ]
