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
    # def get(self, request):
    #     form = EventForm()
    #     return Response({'form':form})
    def post(self, request):
        # View to handle event posting
            form = EventForm(request.data)
            # print(request.data,sys.stderr)
            if form.is_valid():

                event = form.save(commit=False)  # Create an event instance but don't save it yet
                event.organizer = request.user  # Set the current user as the organizer
                event.save()  # Save the event to the database  # Success message
                #return Response({'message' : 'Event posted successfully.'},status=status.HTTP_201_CREATED)  Redirect to the event detail page
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
    permission_classes = (permissions.IsAuthenticated, BasicAuthentication)
    authentication_classes = (SessionAuthentication,) 
    def get(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)
        if request.user == event.organizer:
            serializer = EventOwnerSerializer(event)
        else:
            serializer = EventSerializer(event)
        return Response(serializer.data)
# def event_detail(request, event_id):
#     # View to show event details
#     event = get_object_or_404(Event, id=event_id)  # Retrieve the event or show 404 error
#     if request.user == event.organizer:
#         registered_attendees = event.registered_users.all()
#         return render(request, 'event_detail.html', {'event': event, 'registered_attendees': registered_attendees})
#     else:
#         return render(request, 'event_detail.html', {'event': event})
    
#     #registered_users = EventRegistration.objects.filter(event=event)  # Get registered users for the event
#     #registration_form = EventRegistrationForm()  # Create an empty registration form
#     #return render(request, 'event_detail.html', {
#     #    'event': event,
#     #    'registered_users': registered_users,
#     #    'registration_form': registration_form,
class register(APIView):
    permission_classes = (permissions.IsAuthenticated, BasicAuthentication)
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
                return Response({'message':'Successfully registered for event.'},status=status.HTTP_200_OK)
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
        serializer = UserEventsSerializer(all_events)
        return Response(serializer.data)

# @login_required
# def user_profile(request):
#     # Fetch events the user has posted
#     posted_events = request.user.organized_events.all()
#     # Fetch events the user has registered for
#     registered_events = request.user.events_registered.all()
#     return render(request, 'user_profile.html', {
#         'posted_events': posted_events,
#         'registered_events': registered_events,
#     })
