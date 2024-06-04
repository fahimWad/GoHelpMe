import Header from '../components/header'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/EventList.css';
import axiosInstance from '../axios';
import './css/App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

//AXIOS VARIABLES ARE FOR SECURITY PURPOSES
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

//Client Instance with Django URL in order to type the url only once
const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

// Function to get the CSRF token from the cookie. Function in Django Documentation
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

  export default function EventList() {
    //CSRF Token. Token Used to Request the post.
    const csrftoken = getCookie('csrftoken')
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();
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

    useEffect(() => {
      client.get("/api/volunteer_events/events/", 
        {
            headers: {
            'X-CSRFToken': csrftoken // Include the CSRF token in the request. THIS WAS THE SOLUTION TO THE PROBLEM.
            }
        })
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          setError("Error fetching events: " + error.message);
          console.log("error fetching events");
        });
    }, []);
  
    const registerForEvent = (event_id) => {
        client.put(`/api/volunteer_events/events/${event_id}/register/`, {}, {
            headers: {
              'X-CSRFToken': csrftoken
            }
          })
        .then(response => {
          const updatedEvents = events.map(event => {
            if (event.id === event_id) {
              return { ...event, current_attendees: response.data.current_attendees };
            }
            return event;
          });
          setEvents(updatedEvents);
          setError(null);
        })
        .catch(error => {
            if (error.response && error.response.data.message) {
                setError("Error registering for event: " + error.response.data.message);
            } else {
                setError("Error registering for event: " + error.message);
            }
            console.log("Error in registering for event:", error.response ? error.response.data : error);
        });
    };
    
  /*
    if (!currentUser) {
      console.log("user not logged in");
      navigate('/login');
      return null;
      //return(
        
        //<div>You're not Logged In!</div>
      //)
      console.log("not logged in");
      
    }
    */
    if (currentUser) {
      return (
        <>
          <Header />
          <div className="container">
            <h1 className="text-center my-4">All Volunteer Events</h1>
            <p style={{marginBottom:'30px'}}>Explore a wide variety of upcoming events.
              Whether you're passionate about environmental conservation, community outreach, education, or any other cause, you'll find an event that aligns with your interests. 
              Simply browse through the events, find the ones that resonate with you, and register to volunteer. 
              <br></br><br></br>Join us in making a difference and giving back to the community!</p>
            {error && <p className="text-danger">{error}</p>}
            <div className="grid">
              {events.map(event => (
                <div key={event.id} className="card">
                  <h3>{event.name}</h3>
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>Max Attendees: {event.max_attendees}</p>
                  <p>Current Attendees: {event.current_attendees}</p>
                  <Link to={`/event-detail/${event.id}`}>
                    <Button variant="outline-primary" className="m-2">Event Detail</Button>
                  </Link>
                  <Button variant="primary" onClick={() => registerForEvent(event.id)}>Register</Button>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
    else {
      console.log("from eventlist you are not logged in");
      navigate('/login');
    }
  }