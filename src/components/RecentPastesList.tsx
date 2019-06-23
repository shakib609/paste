import React from "react";
import { QueryResult, Query } from "react-apollo";
import Typography from "@material-ui/core/Typography";

import PasteList from "./PasteList";
import LoadingSpinner from "./LoadingSpinner";
import { GET_RECENT_PASTES } from "../gqlQueryMutations";

const RecentPastesList: React.FC = () => (
  <Query query={GET_RECENT_PASTES}>
    {(result: QueryResult) => (
      <React.Fragment>
        <Typography variant="h6" component="h6">
          Recent Pastes
        </Typography>
        {result.loading && <LoadingSpinner />}
        {result.data.pastes && <PasteList pastes={result.data.pastes} />}
      </React.Fragment>
    )}
  </Query>
);

export default RecentPastesList;
