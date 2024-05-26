import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import PortfolioForm_Delete from './pages/PortfolioForm_Delete';
import PortfolioForm_Create from './pages/PortfolioForm_Create';
import PortfolioForm_Update from './pages/PortfolioForm_Update';

export default function App(){
  return(
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home/ >} />
        <Route path='/contact' index element={<Contact/ >} />
        <Route path='/about' index element={<About/ >} />
        <Route path='/login' index element={<Login/ >} />
        <Route path='/portfolio' index element={<Portfolio/ >} />
        <Route path='/portfolio_create_event' index element={<PortfolioForm_Create/ >} />
        <Route path='/portfolio_delete_event' index element={<PortfolioForm_Delete/ >} />
        <Route path='/portfolio_update_event' index element={<PortfolioForm_Update/ >} />
        <Route path='*' index element={<NoPage/ >} />
      </Routes>
    </BrowserRouter>
  </div>
  )
    
}





//============CHANGES BEFORE THIS=================
// import './App.css';
// import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// //AXIOS VARIABLES ARE FOR SECURITY PURPOSES
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

// //Client Instance with Django URL in order to type the url only once
// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000"
// });

// function App() {

//   const [currentUser, setCurrentUser] = useState();
//   const [registrationToggle, setRegistrationToggle] = useState(false);
//   const [ErrorLogin, setErrorLogin] = useState(null);

//   //FIELD USED
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [first_name, setFirst_name] = useState('');
//   const [last_name, setLast_name] = useState('');
//   const [school, setSchool] = useState('');

//   //Use Effect Hook to determine whether or not the user is logged in by sending a user request to Django API
//   useEffect(() => {
//     client.get("/api/accounts")
//     .then(function(res) {
//       setCurrentUser(true);
//     })
//     .catch(function(error) {
//       setCurrentUser(false);
//     });
//   }, []);

//   //Button Defining registrationToggling
//   function update_form_btn() {
//     if (registrationToggle) {
//       document.getElementById("form_btn").innerHTML = "Register";
//       setRegistrationToggle(false);
//     } else {
//       document.getElementById("form_btn").innerHTML = "Log in";
//       setRegistrationToggle(true);
//     }
//   }
  
//   //Functino defining Registration Form
//   function submitRegistration(e) {
//     e.preventDefault();
//     client.post(
//       "/api/accounts/register",
//       {
//         email: email,
//         username: username,
//         password: password,
//         first_name: first_name,
//         last_name: last_name,
//         school: school
//       }
//     ).then(function(res) {
//       //LOGIN HANDLER
//       client.post(
//         "/api/accounts/login",
//         {
//           username: username,
//           password: password
//         }
//         //SET CURRENT VARIABLE USER TO TRUE
//       ).then(function(res) {
//         setCurrentUser(true);
//       });
//     });
//   }

//   //LOGIN HANDLER SENDS LOGIN DETAILS TO API
//   function submitLogin(e) {
//     e.preventDefault();
//     client.post(
//       "/api/accounts/login",
//       {
//         username: username,
//         password: password
//       }
//     ).then(function(res) {
//       setCurrentUser(true);
//     }).catch(function(ErrorLogin) {
//       if (ErrorLogin.response) {
//         // Request was made and server responded with a status code outside the range of 2xx
//           setErrorLogin("Invalid username or password");
//       } else if (ErrorLogin.request) {
//         // Request was made but no response was received
//         setErrorLogin("No response from server");
//       } else {
//         // Something else happened in making the request
//         setErrorLogin("An unexpected error occurred");
//       }
//     });
//   }

//   function submitLogout(e) {
//     e.preventDefault();
//     client.post(
//       "/api/accounts/logout",
//       {withCredentials: true}
//     ).then(function(res) {
//       setCurrentUser(false);
//     });
//   }

//   //If the currentUser exists, the app component will return a navbar with a logout button and div with message
//   if (currentUser) {
//     return (
//       <div>
//         <Navbar bg="dark" variant="dark">
//           <Container>
//             <Navbar.Brand>Authentication App</Navbar.Brand>
//             <Navbar.Toggle />
//             <Navbar.Collapse className="justify-content-end">
//               <Navbar.Text>
//                 <form onSubmit={e => submitLogout(e)}>
//                   <Button type="submit" variant="light">Log out</Button>
//                 </form>
//               </Navbar.Text>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//           <div className="center">
//             <h2>You're logged in!</h2>
//           </div>
//         </div>
//     );
//   }
//   //Else, If there is no activate current user, we'll return a navbar with a register button that will allow us to toggle
//   return (
//     <div>
//     <Navbar bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand>GoHelpMe</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Navbar.Text>
//             <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
//           </Navbar.Text>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//     {
//       //Defines the registration form toggle depending on the toggle click
//       registrationToggle ? (
//         <div className="center">
//           <Form onSubmit={e => submitRegistration(e)}>
            
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label>Username</Form.Label>
//               <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
//             </Form.Group>
            
//             <Form.Group className="mb-3" controlId="formBasicFirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter First Name" value={first_name} onChange={e => setFirst_name(e.target.value)} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicLastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter Last Name" value={last_name} onChange={e => setLast_name(e.target.value)} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicSchool">
//               <Form.Label>School</Form.Label>
//               <Form.Control type="text" placeholder="Enter School" value={school} onChange={e => setSchool(e.target.value)} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>        
//       ) : (
//         <div className="center">
//           <Form onSubmit={e => submitLogin(e)}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="usernmae" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>

//             {ErrorLogin && <p style={{ color: 'red' }}>{ErrorLogin}</p>}


//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>
//       )
//     }
//     </div>
//   );
// }

// export default App;