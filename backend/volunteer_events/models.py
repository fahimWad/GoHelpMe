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
