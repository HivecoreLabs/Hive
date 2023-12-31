# Generated by Django 4.2.6 on 2023-10-26 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_employee_roles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='roles',
            field=models.ManyToManyField(related_name='employees', through='api.Employee_Role', to='api.role'),
        ),
    ]
