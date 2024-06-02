import './css/App.css';
import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.js';  // Import Header

const PostEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      max_attendees: ''
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axiosInstance.post('/post_event/', formData);
          if (response.status === 201) {
              const eventId = response.data.event_id;
              navigate(`/events/${eventId}/`);
          }
      } catch (error) {
          console.error('Error posting event', error.response ? error.response.data : error.message);
      }
  };

/*
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axiosInstance.post('/post_event/', formData)
      .then((response) => {
        console.log('Event posted successfully:', response.data);
        navigate(`/events/${response.data.event_id}`); // Navigate to event detail page
      })
      .catch((error) => {
        console.error('Error posting event:', error.response.data);
      });
  };
*/
    return (
      <>
        <Header />
        <div className="form-container">
          <h2>Post a New Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Event Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="max_attendees">Max Attendees</label>
              <input
                type="number"
                id="max_attendees"
                name="max_attendees"
                value={formData.max_attendees}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Post Event</button>
          </form>
        </div>
      </>
    );
  };
  
export default PostEvent;