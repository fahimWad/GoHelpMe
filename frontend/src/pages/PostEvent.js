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

export default function Post_Event(){
  
  //CSRF Token. Token Used to Request the post.
  const csrftoken = getCookie('csrftoken')

  const navigate = useNavigate();
  const [ErrorCreate, setErrorCreate] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [maxattendees, setMaxattendees] = useState('');
  //Keep Defining the variables...
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
    
  //DEFINE STATES HERE
  function PostEvent (e) {
    console.log(name)
    console.log(description)
    console.log(date)
    console.log(time)
    console.log(location)
    console.log(maxattendees)
    e.preventDefault();
    client.post(
      "/api/volunteer_events/post_event/",
      {
        name: name,
        description: description, 
        date: date, 
        time: time, 
        location: location, 
        max_attendees: maxattendees,
        //KEEP FILLING OUT
      },
      {
        headers: {
          'X-CSRFToken': csrftoken // Include the CSRF token in the request. THIS WAS THE SOLUTION TO THE PROBLEM.
        }
      }
    ).then(function(res) {;
      navigate('/your-events');
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
    
    };

    //FUNCTION USED TO CONVERT STRING TO INPUT. INPUTS ARE STRINGS BY DEFAULT
    const handleChange = (event) => {
      // Convert the input value to an integer
      const inputValue = parseInt(event.target.value);
      setMaxattendees(inputValue);
    };

    if (currentUser) {
      return(
        <>
        <Header/>
        <div className="center form-container">
          <h1 className="form-title">Post an Event</h1>
          <Form onSubmit={e => PostEvent(e)}>
            <Form.Group className="mb-3" controlId="formBasicEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Event Name" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date MM/DD/YYYY</Form.Label>
              <Form.Control type="text" placeholder="Enter Date" value={date} onChange={e => setDate(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Time HH:MM AM/PM</Form.Label>
              <Form.Control type="text" placeholder="Enter Time" value={time} onChange={e => setTime(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter Location" value={location} onChange={e => setLocation(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMaxattendees">
              <Form.Label>Maximum Attendees</Form.Label>
              <Form.Control type="number" placeholder="Enter Max Attendees" value={maxattendees} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Post Event
            </Button>
          </Form>
        </div>  
      </>
      )
    }
    else {
      navigate('/login');
    }
  }


      //========OLD VERSION (ONLY USE FOR REFERENCE. BELOW IS BAD CODE)==========
    // const navigate = useNavigate();
      // const [formData, setFormData] = useState({
      //   name: '',
      //   description: '',
      //   date: '',
      //   time: '',
      //   location: '',
      //   max_attendees: ''
      // });
    
      // const handleChange = (e) => {
      //   setFormData({ ...formData, [e.target.name]: e.target.value });
      // };

      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //   try {
      //       const response = await axiosInstance.post('/post_event/', formData);
      //       if (response.status === 201) {
      //           const eventId = response.data.event_id;
      //           navigate(`/events/${eventId}/`);
      //       }
      //   } catch (error) {
      //       console.error('Error posting event', error.response ? error.response.data : error.message);
      //   }
      //========END OF BAD CODE========
      //=======START OF BAD CODE=========
      // axiosInstance.post('/post_event/', formData)
      //   .then((response) => {
      //     console.log('Event posted successfully:', response.data);
      //     navigate(`/events/${response.data.event_id}`); // Navigate to event detail page
      //   })
      //   .catch((error) => {
      //     console.error('Error posting event:', error.response.data);
      //   });
      // return (
      //   <>
      //     <Header />
      //     <div className="form-container">
      //       <h2>Post a New Event</h2>
      //       <form onSubmit={handleSubmit}>
      //         <div className="form-group">
      //           <label htmlFor="name">Event Name</label>
      //           <input
      //             type="text"
      //             id="name"
      //             name="name"
      //             value={formData.name}
      //             onChange={handleChange}
      //             required
      //           />
      //         </div>
      //         <div className="form-group">
      //           <label htmlFor="description">Description</label>
      //           <textarea
      //             id="description"
      //             name="description"
      //             value={formData.description}
      //             onChange={handleChange}
      //             required
      //           />
      //         </div>
      //         <div className="form-group">
      //           <label htmlFor="date">Date</label>
      //           <input
      //             type="date"
      //             id="date"
      //             name="date"
      //             value={formData.date}
      //             onChange={handleChange}
      //             required
      //           />
      //         </div>
      //         <div className="form-group">
      //           <label htmlFor="time">Time</label>
      //           <input
      //             type="time"
      //             id="time"
      //             name="time"
      //             value={formData.time}
      //             onChange={handleChange}
      //             required
      //           />
      //         </div>
      //         <div className="form-group">
      //           <label htmlFor="location">Location</label>
      //           <input
      //             type="text"
      //             id="location"
      //             name="location"
      //             value={formData.location}
      //             onChange={handleChange}
      //             required
      //           />
      //         </div>
      //         <div className="form-group">
      //           <label htmlFor="max_attendees">Max Attendees</label>
      //           <input
      //             type="number"
      //             id="max_attendees"
      //             name="max_attendees"
      //             value={formData.max_attendees}
      //             onChange={handleChange}
      //             required
      //           />
      //         </div>
      //         <button type="submit">Post Event</button>
      //       </form>
      //     </div>
      //   </>
      // );
      //=======END OF BAD CODE=========
  
  