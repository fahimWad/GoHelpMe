from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Event, EventRegistration
from .forms import EventForm, EventRegistrationForm

@login_required
def post_event(request):
    # View to handle event posting
    if request.method == 'POST': #checks if form has been submitted
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)  # Create an event instance but don't save it yet
            event.organizer = request.user  # Set the current user as the organizer
            event.save()  # Save the event to the database
            messages.success(request, 'Event posted successfully.')  # Success message
            return redirect('event_detail', event_id=event.id)  # Redirect to the event detail page
    else:
        form = EventForm()  # Create an empty form for GET request
    return render(request, 'post_event.html', {'form': form})  # Render the form

@login_required
def event_list(request):
    # View to list all events
    events = Event.objects.all()  # Retrieve all events
    return render(request, 'event_list.html', {'events': events})  # Render the event list template

@login_required
def event_detail(request, event_id):
    # View to show event details
    event = get_object_or_404(Event, id=event_id)  # Retrieve the event or show 404 error
    if request.user == event.organizer:
        registered_attendees = event.registered_users.all()
        return render(request, 'event_detail.html', {'event': event, 'registered_attendees': registered_attendees})
    else:
        return render(request, 'event_detail.html', {'event': event})
    
    #registered_users = EventRegistration.objects.filter(event=event)  # Get registered users for the event
    #registration_form = EventRegistrationForm()  # Create an empty registration form
    #return render(request, 'event_detail.html', {
    #    'event': event,
    #    'registered_users': registered_users,
    #    'registration_form': registration_form,

@login_required
def register_for_event(request, event_id):
    # View to handle event registration
    event = get_object_or_404(Event, id=event_id)  # Retrieve the event or show 404 error
    if event.current_attendees < event.max_attendees:
        registration, created = EventRegistration.objects.get_or_create(event=event, user=request.user)
        if created: #user not already registered
            event.current_attendees += 1  # Increment the number of registered attendees
            event.save()  # Save the updated event
            messages.success(request, 'Successfully registered for the event.')  # Success message
        else:
            messages.warning(request, 'You are already registered for this event.')  # Warning message
    else:
        messages.error(request, 'Event is already at maximum capacity.')  # Error message
    return redirect('event_detail', event_id=event.id)  # Redirect to the event detail page

@login_required
def user_profile(request):
    # Fetch events the user has posted
    posted_events = request.user.organized_events.all()
    # Fetch events the user has registered for
    registered_events = request.user.events_registered.all()
    return render(request, 'user_profile.html', {
        'posted_events': posted_events,
        'registered_events': registered_events,
    })
