# Generated by Django 4.2.4 on 2024-01-18 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0034_servers_openai'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='servers',
            name='ip',
        ),
    ]