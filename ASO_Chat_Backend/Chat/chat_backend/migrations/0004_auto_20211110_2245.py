# Generated by Django 3.2.9 on 2021-11-10 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_backend', '0003_auto_20211110_1900'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_id',
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
