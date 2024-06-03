import Header from '../components/header'
import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import axios from 'axios';
import './css/EventDetail.css';

//AXIOS VARIABLES ARE FOR SECURITY PURPOSES
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

//Client Instance with Django URL in order to type the url only once
const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
}

export default function EventDetail() {
  const csrftoken = getCookie('csrftoken');
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      client.get(`/api/volunteer_events/events/${eventId}/`, 
      {
          headers: {
              'X-CSRFToken': csrftoken
          }
      })
      .then(response => {
          setEvent(response.data);
      })
      .catch(error => {
          setError("Error fetching event details: " + error.message);
          console.log("Error fetching event details:", error);
      });
  }, [eventId, csrftoken]);

  if (error) {
    return (
        <>
            <Header />
            <div className="event-detail-container">
                <p className="text-danger">{error}</p>
            </div>
        </>
    );
}

  if (!event) {
    return (
        <>
            <Header />
            <div className="event-detail-container">
                <p>Loading...</p>
            </div>
        </>
    );
  }
/*
  const [currentUser, setCurrentUser] = useState();
  //Use Effect Hook to determine whether or not the user is logged in by sending a user request to Django API
  useEffect(() => {
    client.get("/api/accounts")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);
*/
 // if (currentUser) {
    return (
      <>
        <Header />
        <div className="event-detail-container">
            <div className="event-detail-box">
                <h2>{event.name}</h2>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Max Attendees:</strong> {event.max_attendees}</p>
                <p><strong>Current Attendees:</strong> {event.current_attendees}</p>
                
                {event.is_organizer && (
                    <>
                        <h3>Registered Attendees</h3>
                        <ul>
                            {event.attendees.map(attendee => (
                                <li key={attendee.id}>
                                    {attendee.name} - {attendee.email}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    </>
    );
 // }
}