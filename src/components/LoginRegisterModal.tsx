import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import { capitalize } from "../utils";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type LoginRegisterModalProps = {
  open: boolean;
  onClose: () => void;
  formType: string;
  setFormType: (formType: string) => void;
};

const useStyles = makeStyles(theme => ({
  dialog: {
    width: 320
  },
  dialogBody: {
    padding: theme.spacing(2),
    paddingTop: 0
  }
}));

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = props => {
  const classes = useStyles();
  const { formType } = props;

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="xs">
      <DialogTitle>{capitalize(formType)}</DialogTitle>
      <div className={classes.dialogBody}>
        {formType === "login" && <LoginForm onModalClose={props.onClose} />}
        {formType === "register" && (
          <RegisterForm onModalClose={props.onClose} />
        )}
      </div>
    </Dialog>
  );
};

export default LoginRegisterModal;
