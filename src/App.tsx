import React from "react";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Navbar from "./components/Navbar";
import TransparentFullPageSpinner from "./components/TransparentFullPageSpinner";

const NewPastePage = React.lazy(() => import("./pages/NewPastePage"));
const PasteDetailsPage = React.lazy(() => import("./pages/PasteDetailsPage"));

const client = new ApolloClient({
  uri: "http://localhost:8000/api/gql/"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Navbar />
      <React.Suspense fallback={<TransparentFullPageSpinner />}>
        <Router>
          <NewPastePage path="/" />
          <PasteDetailsPage path="/:pasteId" />
        </Router>
      </React.Suspense>
    </ApolloProvider>
  );
};

export default App;
