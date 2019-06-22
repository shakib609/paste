import React from "react";
import { Query, QueryResult } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";

import PasteDetails from "../components/PasteDetails";
import { GET_PASTE_DETAILS } from "../gqlQueryMutations";

type PasteDetailsPageProps = {
  path?: string;
  pasteId?: string;
};

const PasteDetailsPage: React.FC<PasteDetailsPageProps> = ({ pasteId }) => {
  return (
    <Query query={GET_PASTE_DETAILS} variables={{ id: pasteId }}>
      {(result: QueryResult) => (
        <React.Fragment>
          {result.loading && <CircularProgress />}
          {result.error && "Something Went Wrong."}
          {result.data.paste && <PasteDetails paste={result.data.paste} />}
        </React.Fragment>
      )}
    </Query>
  );
};

export default PasteDetailsPage;
