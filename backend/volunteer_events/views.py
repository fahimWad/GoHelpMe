from rest_framework import viewsets
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Event, EventRegistration
from .forms import EventForm, EventRegistrationForm
from collections import namedtuple
from typing import NamedTuple
import sys
class post_event(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    def post(self, request):
        # View to handle event posting
            form = EventForm(request.data)
            if form.is_valid():

                event = form.save(commit=False)  # Create an event instance but don't save it yet
                event.organizer = request.user  # Set the current user as the organizer
                event.save()  # Save the event to the database  # Success message
                return Response({'message': 'Event posted successfully.', 'event_id': event.id}, status=status.HTTP_201_CREATED)
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class event_list(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication, BasicAuthentication) 
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    
class event_detail(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,) 
    def get(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)
        if request.user == event.organizer:
            serializer = EventOwnerSerializer(event)
        else:
            serializer = EventSerializer(event)
        return Response(serializer.data)

class register(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,) 
    def get(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)
        return Response((EventSerializer(event)).data)
    def put(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)
        if event.current_attendees < event.max_attendees:
            registration, created = EventRegistration.objects.get_or_create(event=event, user=request.user)
            if created:
                event.current_attendees += 1
                event.save()
                return Response({'message':'Successfully registered for event.', 'current_attendees': event.current_attendees},status=status.HTTP_200_OK)
            else:
                return Response({'message':'Already registered'},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message':'Event at max capacity'},status=status.HTTP_403_FORBIDDEN)
class user_profile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication, BasicAuthentication) 
    def get(self, request):
        posted_events = request.user.organized_events.all()
        registered_events = request.user.events_registered.all()
        all_events = {'posted':posted_events, 'registered':registered_events}
        serializer = UserProfileSerializer(all_events)
        return Response(serializer.data)

