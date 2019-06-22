import React from "react";
import { Link } from "@reach/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

import LoginRegisterModal from "./LoginRegisterModal";
import { useAuthentication } from "../contexts/useAuthentication";

const useStyles = makeStyles(theme =>
  createStyles({
    appbar: {
      marginBottom: 25
    },
    title: {
      flexGrow: 1
    },
    titleLink: {
      color: "#fcfdfe",
      textDecoration: "none"
    },
    newPasteButton: {
      marginRight: theme.spacing(1)
    }
  })
);

type NavbarProps = {
  default?: boolean;
  navigate?: any;
};

const Navbar: React.FC<NavbarProps> = () => {
  const classes = useStyles();
  const { authToken, logout } = useAuthentication();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [formType, setFormType] = React.useState("login");
  const [
    profileMenuAnchorEl,
    setProfileMenuAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  function openModal(formType: string): void {
    setFormType(formType);
    setModalVisible(true);
  }

  function openProfileMenu(event: React.MouseEvent<HTMLElement>): void {
    setProfileMenuAnchorEl(event.currentTarget);
  }

  function closeProfileMenu(): void {
    setProfileMenuAnchorEl(null);
  }

  return (
    <React.Fragment>
      <AppBar position="relative" className={classes.appbar}>
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.titleLink}>
                Paste
              </Link>
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
            {authToken ? (
              <div>
                <IconButton onClick={openProfileMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={profileMenuAnchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(profileMenuAnchorEl)}
                  onClose={closeProfileMenu}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={closeProfileMenu}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      closeProfileMenu();
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <React.Fragment>
                <Button color="inherit" onClick={() => openModal("login")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => openModal("register")}>
                  Register
                </Button>
              </React.Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {!authToken && (
        <LoginRegisterModal
          formType={formType}
          setFormType={setFormType}
          open={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Navbar;
