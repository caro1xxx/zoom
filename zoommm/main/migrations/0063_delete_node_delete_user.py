# Generated by Django 4.2.4 on 2024-01-20 21:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0062_alter_member_nextreset'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Node',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]