import Header from '../components/header'
import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
  
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await axiosInstance.get(`/api/volunteer_events/events/${eventId}/`);
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching event details', error);
        }
      };
  
      fetchEvent();
    }, [eventId]);
  
    if (!event) {
      return <p>Loading...</p>;
    }
  
    return (
      <>
        <Header />
        <div className="detail-container">
          <div className="detail-box">
            <h1>{event.name}</h1>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Max Attendees:</strong> {event.max_attendees}</p>
            <p><strong>Current Attendees:</strong> {event.current_attendees}</p>
            {event.registered_users && (
              <div>
                <h3>Registered Attendees</h3>
                <ul>
                  {event.registered_users.map(user => (
                    <li key={user.id}>{user.email}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default EventDetail;