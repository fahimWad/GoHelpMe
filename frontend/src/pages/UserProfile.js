import Header from '../components/header'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import './css/App.css';

const UserProfile = () => {
    const [profileData, setProfileData] = useState({
      posted: [],
      registered: []
    });

    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await axiosInstance.get('/profile/');
          setProfileData(response.data);
        } catch (error) {
          console.error('Error fetching profile data', error);
        }
      };
  
      fetchProfileData();
    }, []);

/*
    useEffect(() => {
        axiosInstance.get('/profile/')
        .then((response) => {
            setUserEvents(response.data);
        })
        .catch((error) => {
            console.error('Error fetching user profile:', error);
        });
    }, []);
*/
    return (
        <>
          <Header />
          <div className="profile-container">
            {profileData.registered.length > 0 && (
              <div>
                <h2>Registered Events</h2>
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.registered.map(event => (
                      <tr key={event.id}>
                        <td>
                          <Link to={`/events/${event.id}`}>{event.name}</Link>
                        </td>
                        <td>{event.date}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {profileData.posted.length > 0 && (
              <div>
                <h2>Organized Events</h2>
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.posted.map(event => (
                      <tr key={event.id}>
                        <td>
                          <Link to={`/events/${event.id}`}>{event.name}</Link>
                        </td>
                        <td>{event.date}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      );
    };
  
  export default UserProfile;