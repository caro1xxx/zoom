# Generated by Django 4.2.4 on 2024-01-19 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0054_node_usedtraffice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='usedTraffice',
            field=models.FloatField(default=0.0),
        ),
    ]