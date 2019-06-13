import React, { ReactNode } from "react";
import { Column, Modal } from "rbx";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type LoginRegisterModalProp = {
  active: boolean;
  formType: string;
  setFormType: (formType: string) => void;
  onClose: any;
};

const modalDivStyles: React.CSSProperties = {
  maxWidth: "380px",
  minWidth: "320px",
  margin: "auto",
  padding: "0 12px 25px",
  backgroundColor: "white"
};

const modalTabStyle: React.CSSProperties = {
  paddingTop: "20px",
  paddingBottom: "10px",
  backgroundColor: "rgba(0,0,0, 0.1)",
  cursor: "pointer",
  boxShadow: "inset 0 0 3px rgba(0,0,0,0.6)"
};

const modalTabActiveStyle: React.CSSProperties = {
  ...modalTabStyle,
  backgroundColor: "white",
  cursor: "default",
  boxShadow: "none"
};

type ModalTabProp = {
  children?: ReactNode;
  active: boolean;
  onClick?: () => void;
};

const ModalTab: React.FC<ModalTabProp> = props => (
  <Column
    style={props.active ? modalTabActiveStyle : modalTabStyle}
    onClick={props.onClick}
  >
    <h2 className="has-text-centered has-text-weight-bold is-size-4">
      {props.children}
    </h2>
  </Column>
);

const LoginRegisterModal: React.FC<LoginRegisterModalProp> = props => {
  return (
    <Modal closeOnBlur closeOnEsc active={props.active} onClose={props.onClose}>
      <Modal.Background />
      <Modal.Content>
        <div style={modalDivStyles}>
          <Column.Group style={{ marginBottom: "25px" }} className="is-mobile">
            <ModalTab
              active={props.formType === "login"}
              onClick={() => props.setFormType("login")}
            >
              Login
            </ModalTab>
            <ModalTab
              active={props.formType === "register"}
              onClick={() => props.setFormType("register")}
            >
              Register
            </ModalTab>
          </Column.Group>
          <div style={{ padding: "0 15px" }}>
            {props.formType === "login" && <LoginForm />}
            {props.formType === "register" && <RegisterForm />}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default LoginRegisterModal;
