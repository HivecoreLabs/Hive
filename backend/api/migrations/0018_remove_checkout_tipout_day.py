# Generated by Django 4.2.6 on 2023-11-05 15:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_tipout_formula_is_time_based'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='checkout',
            name='tipout_day',
        ),
    ]