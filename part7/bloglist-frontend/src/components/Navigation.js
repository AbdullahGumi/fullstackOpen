import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';


const Navigation = ({ user, logout }) => {

  const navStyle = {
    paddingTop: 10,
    marginTop: 5
  }

	return (
    <div>
      {user && 
      <Navbar style={navStyle} collapseOnSelect expand="lg" bg="light" variant="primary">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link  to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link  to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
                 <em> logged in as {user.name} <Button variant="outline-success" size='sm' onClick={logout}>Logout</Button></em>
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      }
    </div>
	);
}

export default Navigation;