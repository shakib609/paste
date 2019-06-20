import React from "react";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Navbar from "./components/Navbar";
import Snackbar from "./components/Snackbar";
import { AuthenticationProvider } from "./contexts/useAuthentication";
import { SnackbarProvider } from "./contexts/useSnackbar";
import TransparentFullPageSpinner from "./components/TransparentFullPageSpinner";

const NewPastePage = React.lazy(() => import("./pages/NewPastePage"));
const PasteDetailsPage = React.lazy(() => import("./pages/PasteDetailsPage"));

const graphqlServerURI =
  process.env.NODE_ENV !== "production"
    ? "/api/gql/"
    : "http://localhost:8000/api/gql/";

const client = new ApolloClient({
  uri: graphqlServerURI
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <AuthenticationProvider>
        <SnackbarProvider>
          <Navbar />
          <React.Suspense fallback={<TransparentFullPageSpinner />}>
            <Router>
              <NewPastePage path="/" />
              <PasteDetailsPage path="/:pasteId" />
            </Router>
          </React.Suspense>
          <Snackbar />
        </SnackbarProvider>
      </AuthenticationProvider>
    </ApolloProvider>
  );
};

export default App;
