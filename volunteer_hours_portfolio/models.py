from django.db import models

# Create your models here.
class Entry(models.Model):
    event = models.CharField(max_length=100)
    date = models.DateField(null=True)
    hours = models.PositiveIntegerField(null=True)
    role = models.CharField(max_length=30, null=True)
    organizer = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=280, null=True, blank=True)
    
    def __str__(self):
        return self.event