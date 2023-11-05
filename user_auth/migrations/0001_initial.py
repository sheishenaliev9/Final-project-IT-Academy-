# Generated by Django 4.2.6 on 2023-10-22 12:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Write here name of person', max_length=150)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='persons/')),
                ('email', models.CharField(blank=True, help_text='Write here email of person', max_length=150, null=True)),
                ('number', models.CharField(blank=True, help_text='Write here number of person', max_length=30, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Person',
                'verbose_name_plural': 'Persons',
            },
        ),
    ]