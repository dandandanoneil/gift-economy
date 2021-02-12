import React, { useContext, useState } from "react";
import UserContext from "../../utils/UserContext";
import axios from "axios";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navigation(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, loggedIn } = useContext(UserContext);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) return;

    axios.post("/api/user/login", { email, password })
      .then((res) => props.stateLogIn(res.data))
      .catch(err => console.log(err));
  }

  const onLogOut = () => {
    axios.post("/api/user/logout", {})
      .then((res) => props.stateLogOut())
      .catch(err => console.log(err));
  }

  const onChange = (event) => {
    const target = event.target;
    switch (target.name) {
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        break;
    }
  }


  // This is the login form & signup link that will appear in the Navbar if the user isn't authenticated
  const loginDropdown = (
    <>
      <NavDropdown title="Login" id="nav-dropdown" drop="down">
        <Form className="p-3" style={{ width: "300px" }} onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </Form.Group>
          <Button className="btn-sm" variant="primary" type="submit">
            Log In
            </Button>
        </Form>
      </NavDropdown>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </>
  );

  // This is the logout link that will appear in the Navbar if the user isn't authenticated
  const logoutLink = (
    <Nav.Link onClick={onLogOut}>Logout</Nav.Link>
  );

  const profileLink = (
    <Nav.Link href={`/user/${currentUser._id}`}>{currentUser.name}</Nav.Link>
  );

  return (
    <Navbar expand="md" sticky="top" bg="dark" variant="dark">
      {/* Page name/logo, links to home page */}
      <Navbar.Brand bg="light" href="/">
        <h2 style={{ color: "#d0c311" }}>Care Package</h2>
      </Navbar.Brand>

      {/* Toggler */}
      <Navbar.Toggle aria-controls="navbar-nav" />

      {/* Navbar content - displayed as hamburger on sizes <= medium, hamburger on sizes > medium */}
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">

          {/* Login dropdown form  OR logout link */}
          {loggedIn ? logoutLink : loginDropdown}

          {/* Navigation Links */}
          <Nav.Link href="/create-post">Ask/Offer</Nav.Link>

          <NavDropdown title="Community Exchange" id="community-exchange-dropdown">
            <NavDropdown.Item href="/#search-filter">Goods</NavDropdown.Item>
            <NavDropdown.Item href="/#search-filter">Services</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/create-post">Offer/Ask for Something</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown style={{ color: "white" }} title="Resource Distribution" id="resource-distribution-dropdown">
            <NavDropdown.Item href="/#">$ requests</NavDropdown.Item>
            <NavDropdown.Item href="/#">Ask for $</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/#">Mutual Aid Fridges</NavDropdown.Item>
            <NavDropdown.Item href="/#">Community Events</NavDropdown.Item>
          </NavDropdown>

          {/* Profile link */}
          {loggedIn ? profileLink : <></>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
