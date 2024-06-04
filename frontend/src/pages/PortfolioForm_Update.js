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
import { useNavigate, useParams } from 'react-router-dom';

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

export default function PortfolioForm_Update(){

  //CSRF Token. Token Used to Request the post.
  const csrftoken = getCookie('csrftoken')

  const { pk } = useParams();
  const navigate = useNavigate();
  const [ErrorUpdate, setErrorUpdate] = useState(null);

  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [role, setRole] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');

  // creating event
  function clickUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Token ${token}`
    };
    client.post(
        `/api/volunteer_hours_portfolio/update_entry/${pk}/`,
      {
        event: event,
        date: date,
        hours: hours,
        role: role,
        organizer: organizer,
        description: description
      },
      {
        headers: {
          'X-CSRFToken': csrftoken // Include the CSRF token in the request. THIS WAS THE SOLUTION TO THE PROBLEM.
        }
      }
    ).then(res => {
        setEvent(res.data.event);
        setDate(res.data.date);
        setHours(res.data.hours);
        setRole(res.data.role);
        setOrganizer(res.data.organizer);
        setDescription(res.data.description);
        navigate('/hour-tracker');
    }).catch(function(ErrorUpdate) {
      if (ErrorUpdate.response) {
        // Request was made and server responded with a status code outside the range of 2xx
        setErrorUpdate("Error: Missing inputs");
      } else if (ErrorUpdate.request) {
        // Request was made but no response was received
        setErrorUpdate("Error request: " + ErrorUpdate.request);
      } else {
        // Something else happened in making the request
        setErrorUpdate("Error: " + ErrorUpdate.message);
      }
    });
  }
  const [currentUser, setCurrentUser] = useState();

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

  const positiveHours = (event) => {
    const hours = parseInt(event.target.value);
    if (hours >= 0)
      setHours(hours);
  };

  // if (currentUser) {
    return(
        <>
        <Header/>
        <div className="center form-container">
          <h1 className="form-title">Update Event</h1>
          <p style={{ color: 'red' }}>You must fill in every input, even if you are not changing it, in order to update the event.</p>
          <Form onSubmit={e => clickUpdate(e, pk)}>
            <Form.Group className="mb-3" controlId="formBasicEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Update Event" value={event} onChange={e => setEvent(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Update Date" value={date} onChange={e => setDate(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicHours">
              <Form.Label>Hours</Form.Label>
              <Form.Control type="number" placeholder="Update Hours Worked" value={hours} onChange={positiveHours} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Update Role" value={role} onChange={e => setRole(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicOrganizer">
              <Form.Label>Organizer</Form.Label>
              <Form.Control type="text" placeholder="Update Organizer" value={organizer} onChange={e => setOrganizer(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Update Description" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            {ErrorUpdate && <p style={{ color: 'red' }}>{ErrorUpdate}</p>}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>  

    </>
    )
  // }
  // else {
  //   navigate('/login');
  // }
}