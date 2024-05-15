from django.db import models

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=200)
class Volunteer(models.Model):
    id = models.CharField(max_length=200, unique= True)
    name = models.CharField(max_length=60)
    email = models.CharField(max_length=60, unique= True)

class Event(models.Model):
    id = models.CharField(max_length=200, unique= True)
    STATUS = (
        ('OPEN','OPEN'), 
        ('CLOSED','CLOSED'),
        )
    name = models.CharField(max_length=60, unique=True)
    description = models.CharField(max_length=500, null=True)
    volunteer_limit = models.PositiveIntegerField(default=1,max_length=3)
    current_volunteers = models.PositiveIntegerField(default=0,max_length=3)
    hours = models.PositiveIntegerField(default=0,max_length=3)
    date_posted = models.DateField(auto_now_add=True)
    status = models.CharField(choices=STATUS)
    volunteers = models.ManyToManyField(Volunteer)
