import Header from '../components/header'

import './css/App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchData } from './Portfolio';
import { useNavigate } from 'react-router-dom';

//AXIOS VARIABLES ARE FOR SECURITY PURPOSES
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

//Client Instance with Django URL in order to type the url only once
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export default function PortfolioForm_Create(){
  const navigate = useNavigate();
  const [ErrorCreate, setErrorCreate] = useState(null);

  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [role, setRole] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');

  // creating event
  function handleCreateClick(e) {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Token ${token}`
    };
    client.post(
      "/api/volunteer_hours_portfolio/create_entry/",
      {
        event: event,
        date: date,
        hours: hours,
        role: role,
        organizer: organizer,
        description: description
      },
      { headers: headers } 
    ).then(function(res) {
      // fetchData();
      navigate('/hour-tracker');
    }).catch(function(ErrorCreate) {
      if (ErrorCreate.response) {
        // Request was made and server responded with a status code outside the range of 2xx
        setErrorCreate("Error response: " + ErrorCreate.response.data);
      } else if (ErrorCreate.request) {
        // Request was made but no response was received
        setErrorCreate("Error request: " + ErrorCreate.request);
      } else {
        // Something else happened in making the request
        setErrorCreate("Error: " + ErrorCreate.message);
      }
    });
  }

    return(
        <>
        <Header/>
        <div className="center form-container">
          <h1 className="form-title">Create Event</h1>
          <Form onSubmit={e => handleCreateClick(e)}>
            <Form.Group className="mb-3" controlId="formBasicEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Event Name" value={event} onChange={e => setEvent(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Enter Date" value={date} onChange={e => setDate(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicHours">
              <Form.Label>Hours</Form.Label>
              <Form.Control type="number" placeholder="Enter Hours Worked" value={hours} onChange={e => setHours(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Enter Role" value={role} onChange={e => setRole(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicOrganizer">
              <Form.Label>Organizer</Form.Label>
              <Form.Control type="text" placeholder="Enter Organizer" value={organizer} onChange={e => setOrganizer(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>  

    </>
    )
}