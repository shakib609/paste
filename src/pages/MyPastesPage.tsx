import React from "react";
import { Query, QueryResult } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import LoadingSpinner from "../components/LoadingSpinner";
import PasteList from "../components/PasteList";
import { GET_USER_PASTES } from "../gqlQueryMutations";
import { useAuthentication } from "../contexts/useAuthentication";
import { redirectTo } from "@reach/router";

type MyPastesPageProps = {
  path?: string;
};

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(2)
  }
}));

const MyPastesPage: React.FC<MyPastesPageProps> = () => {
  const classes = useStyles();
  const { authToken } = useAuthentication();

  React.useEffect(() => {
    if (!authToken) redirectTo("/");
  });

  return (
    <React.Fragment>
      <Typography variant="h5" className={classes.title}>
        My Pastes
      </Typography>
      <Query
        query={GET_USER_PASTES}
        context={{ headers: { Authorization: `JWT ${authToken}` } }}
      >
        {(result: QueryResult) => (
          <React.Fragment>
            {result.loading && <LoadingSpinner />}
            {result.data.me && <PasteList pastes={result.data.me.pastes} />}
          </React.Fragment>
        )}
      </Query>
    </React.Fragment>
  );
};

export default MyPastesPage;
