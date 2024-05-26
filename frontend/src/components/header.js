import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/logo.png'; // Adjust the path as necessary

function Header() {
  return (
    <>
      <Navbar style={{ backgroundColor:'#35514F'}} data-bs-theme="dark" expand="lg">
        <Container style={{pading:"0%"}}>
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
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Post Events</Nav.Link>
              <Nav.Link href="/">Your Events</Nav.Link>
              <Nav.Link href="/">Hour Tracker</Nav.Link>
              <Nav.Link href="/">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;