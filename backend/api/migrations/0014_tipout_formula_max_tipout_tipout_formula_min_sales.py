# Generated by Django 4.2.6 on 2023-11-04 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_checkout_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='tipout_formula',
            name='max_tipout',
            field=models.DecimalField(decimal_places=2, max_digits=8, null=True),
        ),
        migrations.AddField(
            model_name='tipout_formula',
            name='min_sales',
            field=models.DecimalField(decimal_places=2, max_digits=8, null=True),
        ),
    ]
