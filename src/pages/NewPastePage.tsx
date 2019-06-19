import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import NewPasteForm from "../components/NewPasteForm";
import RecentPastesList from "../components/RecentPastesList";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    }
  })
);

type NewPastePageProps = {
  path?: string;
};

const NewPastePage: React.FC<NewPastePageProps> = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="space-between" spacing={2}>
        <Grid item md={9} xs={12}>
          <Paper className={classes.paper}>
            <NewPasteForm />
          </Paper>
        </Grid>

        <Grid item md={3} xs={12}>
          <Paper className={classes.paper}>
            <RecentPastesList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPastePage;
