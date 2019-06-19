import React from "react";
import { Link } from "@reach/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import LoginRegisterModal from "./LoginRegisterModal";

const useStyles = makeStyles(theme =>
  createStyles({
    appbar: {
      marginBottom: 25
    },
    title: {
      flexGrow: 1
    },
    newPasteButton: {
      marginRight: theme.spacing(1)
    }
  })
);

type NavbarProps = {
  default?: boolean;
};

const Navbar: React.FC<NavbarProps> = () => {
  const classes = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [formType, setFormType] = React.useState("login");

  function openModal(formType: string): void {
    setFormType(formType);
    setModalVisible(true);
  }

  return (
    <React.Fragment>
      <AppBar position="relative" className={classes.appbar}>
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Paste
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              className={classes.newPasteButton}
              component={Link}
              to="/"
            >
              + New
            </Button>
            <Button color="inherit" onClick={() => openModal("login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => openModal("register")}>
              Register
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginRegisterModal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </React.Fragment>
  );
};

export default Navbar;
