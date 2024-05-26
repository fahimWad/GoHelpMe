from rest_framework import serializers
from .models import *

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'

class UserRelatedEventsSerializer(serializers.Serializer):
    class Meta:
        registered = EventSerializer(many=True)
        organized = EventSerializer(many=True)

class EventPlusAttendeesSerializer(serializers.Serializer):
    class Meta:
        event = EventSerializer()
        attendees = EventRegistrationSerializer(many=True)