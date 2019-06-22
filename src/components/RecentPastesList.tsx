import React from "react";
import { QueryResult, Query } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import PasteList from "./PasteList";
import { GET_RECENT_PASTES } from "../gqlQueryMutations";

const useStyles = makeStyles(theme => ({
  spinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4)
  }
}));

const RecentPastesList: React.FC = () => {
  const classes = useStyles();

  return (
    <Query query={GET_RECENT_PASTES}>
      {(result: QueryResult) => (
        <React.Fragment>
          <Typography variant="h6" component="h6">
            Recent Pastes
          </Typography>
          {result.loading && (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          )}
          {!result.loading && <PasteList pastes={result.data.pastes} />}
        </React.Fragment>
      )}
    </Query>
  );
};

export default RecentPastesList;
