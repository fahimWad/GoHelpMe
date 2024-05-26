from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Entry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    event = models.CharField(max_length=100)
    date = models.DateField(null=True)
    hours = models.PositiveIntegerField(null=True)
    role = models.CharField(max_length=30, null=True)
    organizer = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=280, null=True, blank=True)
    
    def __str__(self):
        return self.event