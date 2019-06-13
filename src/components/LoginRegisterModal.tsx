import React from "react";
import { Box, Modal, Tab } from "rbx";

type LoginRegisterModalProp = {
  active: boolean;
  formType: string;
  setFormType: (formType: string) => void;
  onClose: any;
};

const LoginRegisterModal: React.FC<LoginRegisterModalProp> = props => {
  return (
    <Modal closeOnBlur closeOnEsc active={props.active} onClose={props.onClose}>
      <Modal.Background />
      <Modal.Content>
        <Box style={{ maxWidth: "400px", margin: "auto" }}>
          <Tab.Group align="centered">
            <Tab
              active={props.formType === "login"}
              onClick={() => props.setFormType("login")}
            >
              Login
            </Tab>
            <Tab
              active={props.formType === "register"}
              onClick={() => props.setFormType("register")}
            >
              Register
            </Tab>
          </Tab.Group>
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default LoginRegisterModal;
