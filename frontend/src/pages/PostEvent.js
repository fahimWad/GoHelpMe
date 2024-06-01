import Header from '../components/header'

import './css/App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostEvent(){
    return (
        <>
        <Header/>
        <h2>Post Events</h2>
        </>
    )
}