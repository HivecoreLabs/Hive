# Generated by Django 4.2.6 on 2023-11-03 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_checkout_total_tipout'),
    ]

    operations = [
        migrations.AddField(
            model_name='tipout_formula',
            name='is_time_based',
            field=models.BooleanField(default=False),
        ),
    ]
