# Generated by Django 4.2.4 on 2024-01-31 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0072_prizepool_idx'),
    ]

    operations = [
        migrations.AddField(
            model_name='prizepool',
            name='weights',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
