import Header from '../components/header'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import './css/App.css';


const EventList = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axiosInstance.get('/events/');
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events', error);
        }
      };
  
      fetchEvents();
    }, []);

    return (
        <div>
          <Header />
          <div className="container">
            <h2>Events</h2>
            <div className="event-grid">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <h3>{event.name}</h3>
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>Max Attendees: {event.max_attendees}</p>
                  <p>Current Attendees: {event.current_attendees}</p>
                  <Link to={`/events/${event.id}`} className="details-link">Details</Link>
                  <button className="register-button">Register</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }    

/*
    return (
      <>
        <Header />
        <div className="events-container">
          {events.map(event => (
            <div key={event.id} className="event-box">
              <h3><Link to={`/events/${event.id}`}>{event.name}</Link></h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Max Attendees:</strong> {event.max_attendees}</p>
              <p><strong>Current Attendees:</strong> {event.current_attendees}</p>
              <button className="register-button">Register</button>
            </div>
          ))}
        </div>
      </>
    );
  };
  */
  export default EventList;