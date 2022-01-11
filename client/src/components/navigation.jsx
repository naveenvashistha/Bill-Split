import {Link} from "react-router-dom";
import React from "react";
import {Nav,Navbar,Container} from "react-bootstrap";
const axios = require("axios");
axios.defaults.withCredentials = true;



function Navigation(props){
  
  return (
    <Navbar collapseOnSelect sticky="top" className = "custom_navbar" expand="lg">
  <Container>
    <Navbar.Brand>Bill Split</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
        <Nav.Link className="navLink" as ={Link} to="/">Register</Nav.Link>
        <Nav.Link className="navLink" as ={Link} to="/login">Login</Nav.Link>
        <Nav.Link className="navLink" as ={Link} to="/billsplit">User</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}


export default Navigation;