import Header from '../components/header'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import './css/App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './css/UserProfile.css';
import { useNavigate } from 'react-router-dom';

// AXIOS VARIABLES ARE FOR SECURITY PURPOSES
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
export default function UserProfile() {
    const csrftoken = getCookie('csrftoken');
    const [userEvents, setUserEvents] = useState({ posted: [], registered: [] });
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
        navigate('/login');
      });
    }, []);

    useEffect(() => {
      client.get('/api/volunteer_events/profile/', {
        headers: {
          'X-CSRFToken': csrftoken
        }
      })
        .then(response => {
            const { posted = [], registered = [] } = response.data;
            setUserEvents({ posted, registered });
        })
        .catch(error => {
          setError("Error fetching user events: " + error.message);
          console.log("error fetching user events for profile");
        });
    }, [csrftoken]);
/*
    if (currentUser === null) {
      console.log("currentuser is null");
      navigate('/login');
      return null;
    }

    if (!currentUser) {
      console.log("from event profile user not logged in");
      navigate('/login');
      return null;
    }
*/
    if (currentUser) {
      return (
        <>
          <Header />
          <div className="container">
            <h1 className="text-center my-4">Your Events</h1>
            {error && <p className="text-danger">{error}</p>}
            <div>
              {userEvents.registered.length > 0 ? (
                <div>
                  <h2>Registered Events</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Current Attendees</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userEvents.registered.map(event => (
                        <tr key={event.id}>
                          <td>{event.name}</td>
                          <td>{event.location}</td>
                          <td>{event.date}</td>
                          <td>{event.time}</td>
                          <td>{event.current_attendees}</td>
                          <td>
                            <Link to={`/event-detail/${event.id}`}>
                              <Button variant="outline-primary" className="m-2">Event Detail</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No registered events.</p>
              )}
              {userEvents.posted.length > 0 ? (
                <div>
                  <h2>Posted Events</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Current Attendees</th>
                        <th>Registered Users</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userEvents.posted.map(event => (
                        <tr key={event.id}>
                          <td>{event.name}</td>
                          <td>{event.location}</td>
                          <td>{event.date}</td>
                          <td>{event.time}</td>
                          <td>{event.current_attendees}</td>
                          <td>
                            <ul>
                              {event.registered_users && event.registered_users.map(user => (
                                <li key={user.email}>{user.name} ({user.email})</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <Link to={`/event-detail/${event.id}`}>
                              <Button variant="outline-primary" className="m-2">Event Detail</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No posted events.</p>
              )}
            </div>
          </div>
        </>
      );
    }
    /*
    else {
      console.log("from event profile user not logged in");
      navigate('/login');
    }
    */
  }