# Generated by Django 4.2.4 on 2024-01-18 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0038_rename_main_user_passwor_c910fe_idx_users_passwor_a706a3_idx_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='expireTime',
            field=models.IntegerField(default=0),
        ),
    ]