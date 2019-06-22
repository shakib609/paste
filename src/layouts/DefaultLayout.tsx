import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Navbar from "../components/Navbar";
import RecentPastesList from "../components/RecentPastesList";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    recentPastesList: {
      marginBottom: theme.spacing(4)
    }
  })
);

type DefaultLayoutProps = {
  path?: string;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Grid container justify="space-between" spacing={2}>
          <Grid item md={9} xs={12}>
            <Paper className={classes.paper}>{children}</Paper>
          </Grid>

          <Grid item md={3} xs={12}>
            <Paper className={`${classes.paper} ${classes.recentPastesList}`}>
              <RecentPastesList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default DefaultLayout;
