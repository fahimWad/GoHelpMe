from django.contrib import admin
from .models import Event, EventRegistration

# Register the Event model with the admin site
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'time', 'location', 'organizer', 'max_attendees', 'current_attendees')
    search_fields = ('name', 'location', 'organizer__username')
    list_filter = ('date', 'location', 'organizer')
    date_hierarchy = 'date'

admin.site.register(Event, EventAdmin)

# Register the EventRegistration model with the admin site
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('event', 'user', 'registration_date')
    search_fields = ('event__name', 'user__username')
    list_filter = ('event', 'user')

admin.site.register(EventRegistration, EventRegistrationAdmin)
