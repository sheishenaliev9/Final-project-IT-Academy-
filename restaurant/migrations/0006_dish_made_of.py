# Generated by Django 4.2.6 on 2023-10-26 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0005_table_dishes'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='made_of',
            field=models.TextField(default='dk', help_text='Write here what is it made of'),
        ),
    ]
