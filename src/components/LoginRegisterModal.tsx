import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { capitalize } from "../utils";
import LoginForm from "./LoginForm";

type LoginRegisterModalProps = {
  open: boolean;
  onClose: () => void;
};

const useStyles = makeStyles(theme => ({
  modal: {
    alignItems: "center",
    justifyContent: "center"
  },
  modalBody: {
    position: "absolute",
    top: "25vh",
    bottom: "10vh",
    margin: "auto"
  },
  paper: {
    width: 320,
    padding: theme.spacing(2),
    margin: "25vh auto 10vh"
  },
  modalTitle: {
    marginBottom: theme.spacing(1)
  }
}));

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = props => {
  const classes = useStyles();
  const [formType, setFormType] = React.useState("login");

  return (
    <Modal open={props.open} onClose={props.onClose} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography
          variant="h5"
          component="h3"
          align="center"
          className={classes.modalTitle}
        >
          {capitalize(formType)}
        </Typography>
        {formType === "login" && <LoginForm onModalClose={props.onClose} />}
      </Paper>
    </Modal>
  );
};

export default LoginRegisterModal;
