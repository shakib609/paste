import React from "react";
import { Navbar, Container, Button } from "rbx";
import { Link } from "react-router-dom";

import LoginRegisterModal from "./LoginRegisterModal";

const PNavbar: React.FC = () => {
  // TODO: Set this to false later
  const [modalVisible, setModalVisible] = React.useState(false);
  const [formType, setFormType] = React.useState("login");

  function openModal(formType: string): void {
    setFormType(formType);
    setModalVisible(true);
  }

  return (
    <React.Fragment>
      <LoginRegisterModal
        active={modalVisible}
        formType={formType}
        setFormType={fT => setFormType(fT)}
        onClose={() => setModalVisible(false)}
      />
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
              <Navbar.Item onClick={() => openModal("login")}>
                Login
              </Navbar.Item>
              <Navbar.Item onClick={() => openModal("register")}>
                Register
              </Navbar.Item>
            </Navbar.Segment>
          </Navbar.Menu>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default PNavbar;
