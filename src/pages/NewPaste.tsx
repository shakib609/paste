import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import NewPasteForm from "../components/NewPasteForm";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    }
  })
);

type NewPasteProps = {
  path?: string;
};

const NewPaste: React.FC<NewPasteProps> = () => {
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
            <Typography variant="h6" component="h6">
              Public Pastes
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPaste;
