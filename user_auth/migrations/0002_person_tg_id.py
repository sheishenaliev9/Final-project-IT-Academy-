# Generated by Django 4.2.6 on 2023-10-27 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='tg_id',
            field=models.CharField(blank=True, help_text='Write here your Telegram ID', max_length=150, null=True, unique=True),
        ),
    ]