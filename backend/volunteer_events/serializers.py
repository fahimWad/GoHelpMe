from rest_framework import serializers
from .models import *

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        exclude = ['registered_users']

class EventOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
    

class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'

class UserEventsSerializer(serializers.Serializer):
    posted = serializers.ListField(child=serializers.CharField())
    registered = serializers.ListField(child=serializers.CharField())
