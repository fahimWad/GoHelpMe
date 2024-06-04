import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/logo.png'; 
import '../pages/css/Header.css'
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from './UserContext';  // Import context


function Header() {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    client.get("/api/accounts")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);  

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    // AXIOS VARIABLES FOR SECURITY PURPOSES
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true
    });
  
    function submitLogout(e) {
      e.preventDefault();
      client.post(
        "/api/accounts/logout",
        {withCredentials: true}
      ).then(function(res) {
        navigate('/');
        setCurrentUser(false);
      });
    }

  return (
    <>
      <Navbar style={{ backgroundColor:'#35514F'}} data-bs-theme="dark" expand="lg">
        <Container className="header-container" style={{pading:"0%"}}>
          <Navbar.Brand href="/home">
            <img
              src={logo}
              alt="GoHelpMe logo"
              width="32"
              height="32"
              className="d-inline-block align-top"
            />{' '}
            GoHelpMe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link href="/post-event">Post Events</Nav.Link>
              <Nav.Link href="/your-events">Your Events</Nav.Link>
              <Nav.Link href="/hour-tracker">Hour Tracker</Nav.Link>
              <Navbar.Text>
               <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" className="logout-button" variant="light">Log out</Button>
               </form>
             </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;