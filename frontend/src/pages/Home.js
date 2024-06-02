import './css/Home.css';
import Header from '../components/header'
import LoginButton from '../components/login_button'
import trees from '../components/assets/trees.png'; // Adjust the path as necessary
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../components/assets/logo.png'; 
import Button from 'react-bootstrap/Button';


export default function Home(){
    return(
        <>
        <Navbar bg="Light" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                    src={logo}
                    alt="GoHelpMe logo"
                    width="32"
                    height="32"
                    className="d-inline-block align-top"
                    />{' '}
                    GoHelpMe
                </Navbar.Brand>
            </Container>
        </Navbar>
        <div class="center">
            <h2>Welcome to GoHelpMe</h2>
        </div>
        <div className="trees" class="center">
            <img src={trees} alt="Home Page" style={{ width: '550px', margin: '-60px auto auto auto'}} />
        </div>
        <div class="welcome-container">
            <p className="welcome-message">
                Welcome to GoHelpMe, your all-in-one platform for making a difference in your community through volunteering! 
                Using GoHelpMe, volunteers can easily find meaningful opportunities to contribute their time and skills for a greater cause.
                Whether you're passionate about environmental conservation, community outreach, or education initiatives, 
                GoHelpMe allows users to browse and sign up for a variety of events. 
                As a user, you can: <br /><br />(1) sign up to become a volunteer for any event posted on the website, <br />
                (2) post events onto our website to get volunteers for your event,
                <br />(3) create your portfolio to track all your hours and contributions, gaining insight into your impact over time. <br /><br />
                Join us in building a better world, one event at a time! Login below to get started.<br /><br /></p>
        </div>
        <div class="center" style={{ margin: 'auto auto auto auto'}} >
            <LoginButton />
        </div>
    </>
    )
}
