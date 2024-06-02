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

/*
const EventList = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      axiosInstance.get('/events/')
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
        });
    }, []);
*/
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
  
  export default EventList;