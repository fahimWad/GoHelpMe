<<<<<<< HEAD
# Generated by Django 5.0.6 on 2024-05-14 06:53
=======
# Generated by Django 5.0.6 on 2024-05-15 06:54
>>>>>>> claire_loginv1.0

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_account_school'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='school',
            field=models.CharField(choices=[('UCLA', 'UCLA'), ('Stanford University', 'Stanford University'), ('MIT', 'MIT'), ('Caltech', 'Caltech'), ('UCSD', 'UCSD'), ('USC', 'USC'), ('Harvard University', 'Harvard University'), ('UCI', 'UCI'), ('UC Berkeley', 'UC Berkeley'), ('Dartmouth University', 'Dartmouth University'), ('Cornell University', 'Cornell University')], max_length=50),
        ),
    ]
