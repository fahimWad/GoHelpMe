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

class ProfileSerializer(serializers.ModelSerializer):
    registered_users = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'date', 'time', 'location', 'current_attendees', 'registered_users']

    def get_registered_users(self, obj):
        users = obj.registered_users.all()
        return [{'name': user.username, 'email': user.email} for user in users]

class UserProfileSerializer(serializers.Serializer):
    posted = ProfileSerializer(many=True)
    registered = ProfileSerializer(many=True)