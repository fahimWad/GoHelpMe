import Header from '../components/header'
import PortfolioCreateButton from '../components/portfolio_create_button'
import PortfolioDeleteButton from '../components/portfolio_delete_button'
import PortfolioUpdateButton from '../components/portfolio_update_button'

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
  baseURL: "http://127.0.0.1:8000"
});

export function fetchData() {
    // implementation  
}

function Portfolio() {
    // const history = useHistory();

    const[data,setData] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/volunteer_hours_portfolio/portfolio/')
        .then(res => {
            console.log('Data fetched:', res.data);
            setData(res.data);
        })
        .catch(err => {
            console.log('Error in data fetching:',err)
        });
    }, [])

    return(
        <>
        <Header>
        <div class="center">
            <h2>Portfolio Page</h2>
        </div>
        </Header>
        <div class="center">

            <PortfolioCreateButton/>
        </div>
        {/* TABLE USED IN PORTFOLIO */}
        <div className = 'p-5 bg-light'>
            <div className = 'bg-white shadow border'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Date of Event</th>
                            <th>Hours Worked</th>
                            <th>Role</th>
                            <th>Organizer</th>
                            <th>Description</th>
                            <div>
                                <PortfolioUpdateButton />
                            </div>
                            <div>
                                <PortfolioDeleteButton />
                            </div>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.event}</td>
                                <td>{d.date}</td>
                                <td>{d.hours}</td>
                                <td>{d.role}</td>
                                <td>{d.organizer}</td>
                                <td>{d.description}</td>
                                <td>
                                    <PortfolioUpdateButton />
                                    <PortfolioDeleteButton />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
        

    </>
    )

}

export default Portfolio;