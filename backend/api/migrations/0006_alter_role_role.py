# Generated by Django 4.2.6 on 2023-10-27 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_employee_roles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='role',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
