# Generated by Django 4.2.6 on 2023-11-05 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_tipout_formula_is_time_based'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkout',
            name='is_am_shift',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='tipout_formula',
            name='is_time_based',
            field=models.BooleanField(default=False),
        ),
    ]