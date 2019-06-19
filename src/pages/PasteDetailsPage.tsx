import React from "react";
import { Query, QueryResult } from "react-apollo";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import PasteDetails from "../components/PasteDetails";
import RecentPastesList from "../components/RecentPastesList";
import { GET_PASTE_DETAILS } from "../gqlQueryMutations";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    }
  })
);

type PasteDetailsPageProps = {
  path?: string;
  pasteId?: string;
};

const PasteDetailsPage: React.FC<PasteDetailsPageProps> = ({ pasteId }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="space-between" spacing={2}>
        <Grid item md={9} xs={12}>
          <Paper className={classes.paper}>
            <Query query={GET_PASTE_DETAILS} variables={{ id: pasteId }}>
              {(result: QueryResult) => (
                <React.Fragment>
                  {result.loading && <CircularProgress />}
                  {result.error && "Something Went Wrong."}
                  {result.data.paste && (
                    <PasteDetails paste={result.data.paste} />
                  )}
                </React.Fragment>
              )}
            </Query>
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

export default PasteDetailsPage;
