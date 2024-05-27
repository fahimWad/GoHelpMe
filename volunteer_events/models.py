'''<<<<<<< HEAD
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

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
    LOCATION = (
        ('Los Angeles','Los Angeles')
        ('San Diego','San Diego')
        ('San Jose','San Jose')
        ('San Francisco','San Francisco')
        ('Fresno','Fresno')
        ('Sacramento','Sacramento')
        ('Long Beach','Long Beach')
        ('Oakland','Oakland')
        ('Bakersfield','Bakersfield')
        ('Anaheim','Anaheim')
        ('Stockton','Stockton')
        ('Riverside','Riverside')
        ('Santa Ana','Santa Ana')
        ('Irvine','Irvine')
        ('Chula Vista','Chula Vista')
        ('Fremont','Fremont')
        ('Santa Clarita','Santa Clarita')
        ('San Bernardino','San Bernardino')
        ('Modesto','Modesto')
        ('Moreno Valley','Moreno Valley')
        ('Fontana','Fontana')
        ('Oxnard','Oxnard')
        ('Huntington Beach','Huntington Beach')
        ('Glendale','Glendale')
        ('Santa Rosa','Santa Rosa')
        ('Ontario','Ontario')
        ('Elk Grove','Elk Grove')
        ('Rancho Cucamonga','Rancho Cucamonga')
        ('Oceanside','Oceanside')
        ('Garden Grove','Garden Grove')
        ('Lancaster','Lancaster')
        ('Palmdale','Palmdale')
        ('Salinas','Salinas')
        ('Hayward','Hayward')
        ('Escondido', 'Escondido')
        ('Pomona','Pomona')
        ('Roseville','Roseville')
        ('Torrance','Torrance')
        ('Fullerton','Fullerton')
        ('Visalia','Visalia')
        ('Orange','Orange')
        ('Pasadena','Pasadena')
        ('Santa Clara','Santa Clara')
        ('Thousand Oaks','Thousand Oaks')
        ('Simi Valley','Simi Valley')
        ('Vallejo','Vallejo')
        ('Concord','Concord')

        )
    name = models.CharField(max_length=60, unique=True)
    
    description = models.CharField(max_length=500, null=True)
    day = models.PositiveIntegerField(default=1,validators=[MinValueValidator(1), MaxValueValidator(31))
    month = models.PositiveIntegerField(default=1,validators=[MinValueValidator(1), MaxValueValidator(12)])
    volunteer_limit = models.PositiveIntegerField(default=1,validators=[MinValueValidator(1), MaxValueValidator(999)])
    current_volunteers = models.PositiveIntegerField(default=0,validators=[MinValueValidator(1), MaxValueValidator(999)])
    hours = models.PositiveIntegerField(default=0,max_length=3)
    date_posted = models.DateField(auto_now_add=True)
    status = models.CharField(choices=STATUS)
    location = models.CharField(choices=LOCATION)
    volunteers = models.ManyToManyField(Volunteer)
======='''
from django.db import models
from django.conf import settings  # Import settings to use AUTH_USER_MODEL

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organized_events')  # Use settings.AUTH_USER_MODEL
    max_attendees = models.PositiveIntegerField()
    current_attendees = models.PositiveIntegerField(default=0)
    registered_users = models.ManyToManyField(settings.AUTH_USER_MODEL, through='EventRegistration', related_name='events_registered')  # Use settings.AUTH_USER_MODEL

    def __str__(self):
        return self.name

class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Use settings.AUTH_USER_MODEL
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} registered for {self.event.name}'
