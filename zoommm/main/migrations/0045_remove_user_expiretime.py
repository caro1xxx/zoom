# Generated by Django 4.2.4 on 2024-01-19 06:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0044_member_bascemailnotify_member_cloudrules_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='expireTime',
        ),
    ]