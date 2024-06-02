import Header from '../components/header'
import './css/Portfolio.css';
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

function Portfolio() {

    //CSRF Token. Token Used to Request the post.
    const csrftoken = getCookie('csrftoken')

    const[data,setData] = useState([]);
    const[sortedField, setSortedField] = React.useState(null);
    const[sortingOrder, setSortingOrder] = useState('asc');
    const[searchEvent, setSearchEvent] = useState('');
    const[searchDate, setSearchDate] = useState('');
    const[searchHours, setSearchHours] = useState('');
    const[searchRole, setSearchRole] = useState('');
    const[searchOrganizer, setSearchOrganizer] = useState('');

    const sortedData = data.sort((a, b) => {
        if (!sortedField) 
            return 0;
        if (a[sortedField] < b[sortedField])
            return sortingOrder === 'asc' ? -1 : 1;
        if (a[sortedField] > b[sortedField])
            return sortingOrder === 'asc' ? 1 : -1;
        return 0;
      });
    
    const handleDelete = (pk) => {
        const newData = data.filter(item => item.id !== pk);
        setData(newData); 
        client.delete(`/api/volunteer_hours_portfolio/delete_entry/${pk}/`, {
            headers: {
                'X-CSRFToken': csrftoken // Include the CSRF token in the request. THIS WAS THE SOLUTION TO THE PROBLEM.
            }
        }).then(res => {
            console.log('Deleted Event:', res.data);
        })
        .catch(err => {
            console.log('Error in Deleting Event:',err);
        });
    };

    useEffect(() => {
        client.get('/api/volunteer_hours_portfolio/portfolio/', {
            headers: {
                'X-CSRFToken': csrftoken // Include the CSRF token in the request. THIS WAS THE SOLUTION TO THE PROBLEM.
            }
        })
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
        </Header>
        <div class="center">
            <h2>Hour Tracker</h2>
        </div>
        <div className="portfolio-description">
            <p><br></br>Welcome to the Hour Tracking Page, your one-stop solution for managing and tracking your volunteer or work hours. This page allows you to log and keep detailed records of all your events. Here's what you can do: <br></br><br></br></p>
            <li><b>Event Name:</b> Input the name of the event you participated in.</li>
            <li><b>Date of Event:</b> Specify the exact date when the event took place.</li>
            <li><b>Hours Worked:</b> Record the number of hours you contributed to the event.</li>   
            <li><b>Role:</b> Describe the role you played or the tasks you performed during the event.</li>
            <li><b>Organizer:</b> Enter the name of the organization or individual who organized the event.</li>
            <li><b>Description:</b> Provide a detailed description of the event, including any significant activities or outcomes.</li>
            <p><br></br><br></br>
                Using this page, you can easily keep track of your hours and events, ensuring you have a comprehensive record of your contributions and experiences. This is an excellent tool for maintaining a detailed log for future reference, applications, or personal satisfaction. Start logging your events today and take control of your time management!<br></br></p>
        </div>
        <div className="portfolio-button">
            <PortfolioCreateButton/>
        </div>
        <div class="center" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: '20px', marginRight: '20px'}}>
                <input
                    type="text"
                    value={searchEvent}
                    onChange={(e) => setSearchEvent(e.target.value)}
                    placeholder="Search by Event Name"
                    style={{ width: '230px'}}
                />
            </div>
            <div style={{ marginLeft: '20px', marginRight: '20px'}}>
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    placeholder="Search by Date"
                />
            </div>
            <div style={{ marginLeft: '20px', marginRight: '20px'}}>
                <input
                    type="number"
                    value={searchHours}
                    onChange={(e) => setSearchHours(e.target.value)}
                    placeholder="Search by Hours Worked"
                    style={{ width: '230px'}}
                />
            </div>
            <div style={{ marginLeft: '20px', marginRight: '20px'}}>
                <input
                    type="text"
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    placeholder="Search by Role"
                    style={{ width: '230px'}}
                />
            </div>
            <div style={{ marginLeft: '20px', marginRight: '20px'}}>
                <input
                    type="text"
                    value={searchOrganizer}
                    onChange={(e) => setSearchOrganizer(e.target.value)}
                    placeholder="Search by Organizer"
                    style={{ width: '230px'}}
                />
            </div>
        </div>
        {/* TABLE USED IN PORTFOLIO */}
        <div className = 'p-5 bg-light'>
            <div className = 'bg-white shadow border'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>
                                <span onClick={() => setSortedField('event')}>
                                    Event Name
                                    <button type="button" style={{ border: 'none', backgroundColor: 'transparent', color: 'black'}}>
                                        {sortingOrder === 'asc' ? '▲' : '▼'}
                                    </button>
                                </span>
                            </th>
                            <th>
                                <span onClick={() => setSortedField('date')}>
                                    Date of Event
                                    <button type="button" style={{ border: 'none', backgroundColor: 'transparent', color: 'black'}}>
                                        {sortingOrder === 'asc' ? '▲' : '▼'}
                                    </button>
                                </span>
                            </th>
                            <th>
                                <span onClick={() => setSortedField('hours')}>
                                    Hours Worked
                                    <button type="button" style={{ border: 'none', backgroundColor: 'transparent', color: 'black'}}>
                                        {sortingOrder === 'asc' ? '▲' : '▼'}
                                    </button>
                                </span>
                            </th>
                            <th>
                                <span onClick={() => setSortedField('role')}>
                                    Role
                                    <button type="button" style={{ border: 'none', backgroundColor: 'transparent', color: 'black'}}>
                                        {sortingOrder === 'asc' ? '▲' : '▼'}
                                    </button>
                                </span>
                            </th>
                            <th>
                                <span onClick={() => setSortedField('organizer')}>
                                    Organizer
                                    <button type="button" style={{ border: 'none', backgroundColor: 'transparent', color: 'black'}}>
                                        {sortingOrder === 'asc' ? '▲' : '▼'}
                                    </button>
                                </span>
                            </th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) => {
                            return searchEvent.toLowerCase() === '' ? item : item.event.toLowerCase().includes(searchEvent);
                        })
                        .filter((item) => {
                            return searchDate.toLowerCase() === '' ? true : item.date.toLowerCase().includes(searchDate);
                        })
                        .filter((item) => {
                            return searchHours === '' ? true : item.hours.toString().includes(searchHours);
                        })
                        .filter((item) => {
                            return searchRole.toLowerCase() === '' ? true : item.role.toLowerCase().includes(searchRole);
                        })
                        .filter((item) => {
                            return searchOrganizer.toLowerCase() === '' ? true : item.organizer.toLowerCase().includes(searchOrganizer);
                        })
                        .map((d, i) => (
                            <tr key={i}>
                                <td>{d.event}</td>
                                <td>{d.date}</td>
                                <td>{d.hours}</td>
                                <td>{d.role}</td>
                                <td>{d.organizer}</td>
                                <td>{d.description}</td>
                                <td>
                                    <div className="d-flex">
                                        <PortfolioUpdateButton pk={d.id}/>
                                        {/* getting the ID of the event from the map */}
                                        <PortfolioDeleteButton pk={d.id} onClick={handleDelete} />
                                    </div>
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