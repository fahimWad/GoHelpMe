# Generated by Django 5.0.6 on 2024-05-18 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.CharField(max_length=200)),
                ('date', models.DateField(null=True)),
                ('hours', models.PositiveIntegerField(null=True)),
            ],
        ),
    ]