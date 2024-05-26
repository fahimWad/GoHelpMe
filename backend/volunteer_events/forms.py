from django import forms
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Event
import datetime

class EventForm(forms.ModelForm):
    # Form to create or update an event
    date = forms.DateField(widget=forms.TextInput(attrs={'placeholder': 'MM/DD/YYYY'}), input_formats=['%m/%d/%Y'])
    time = forms.TimeField(widget=forms.TextInput(attrs={'placeholder': 'HH:MM AM/PM'}), input_formats=['%I:%M %p'])

    class Meta:
        model = Event
        fields = ['name', 'description', 'date', 'time', 'location', 'max_attendees']  # Fields to include in the form
        def clean_date(self):
            date = self.cleaned_data['date']
            if date < timezone.now().date():
                raise ValidationError("Event date cannot be in the past.")
            return date

        def clean_time(self):
            time = self.cleaned_data['time']
            date = self.cleaned_data.get('date')
            if date == timezone.now().date() and time < timezone.now().time():
                raise ValidationError("Event time cannot be in the past.")
            return time
        
        def clean(self):
            cleaned_data = super().clean()
            date = cleaned_data.get('date')
            time = cleaned_data.get('time')
            if date and time:
                event_datetime = datetime.datetime.combine(date, time)
                if event_datetime < timezone.now():
                    raise ValidationError("The event date and time cannot be in the past.")
            return cleaned_data
        
class EventRegistrationForm(forms.Form):
    # Form for event registration (no fields needed)
    pass
