import Header from '../components/header'

import './css/App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

//AXIOS VARIABLES ARE FOR SECURITY PURPOSES
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

//Client Instance with Django URL in order to type the url only once
const client = axios.create({
  baseURL: "http://127.0.0.1:8000/portfolio"
});

export default function PortfolioForm_Delete(){
    return(
        <>
        <Header/>
        <h2>Portfolio Delete Event</h2>


    </>
    )

}