# Generated by Django 4.2.4 on 2024-02-04 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0078_remove_plans_icon_remove_plans_real_plans_featrue_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plans',
            name='featrue',
        ),
    ]
