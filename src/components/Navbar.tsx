import React from "react";
import { Navbar, Container, Button } from "rbx";
import { Link } from "react-router-dom";

const PNavbar: React.FC = () => {
  return (
    <Navbar color="light">
      <Container>
        <Navbar.Brand>
          <Navbar.Item as={Link} to="/">
            <h1>
              <b>Paste</b>
            </h1>
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Segment align="end">
            <Navbar.Item as="span">
              <Button color="primary" as={Link} to="/">
                <b>+ New Paste</b>
              </Button>
            </Navbar.Item>
            <Navbar.Item>Login</Navbar.Item>
            <Navbar.Item>Register</Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

export default PNavbar;
