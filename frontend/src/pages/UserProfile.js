import Header from '../components/header'

import './css/App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile(){
    return (
        <>
        <Header/>
        <h2>Your Events</h2>
        </>
    )
}