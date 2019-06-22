import React from "react";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Snackbar from "./components/Snackbar";
import { AuthenticationProvider } from "./contexts/useAuthentication";
import { SnackbarProvider } from "./contexts/useSnackbar";
import TransparentFullPageSpinner from "./components/TransparentFullPageSpinner";
import DefaultLayout from "./layouts/DefaultLayout";

const NewPastePage = React.lazy(() => import("./pages/NewPastePage"));
const PasteDetailsPage = React.lazy(() => import("./pages/PasteDetailsPage"));
const MyPastesPage = React.lazy(() => import("./pages/MyPastesPage"));

const graphqlServerURI =
  process.env.NODE_ENV === "production"
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
          <React.Suspense fallback={<TransparentFullPageSpinner />}>
            <Router>
              <DefaultLayout path="/">
                <NewPastePage path="/" />
                <MyPastesPage path="my" />
                <PasteDetailsPage path=":pasteId" />
              </DefaultLayout>
            </Router>
          </React.Suspense>
          <Snackbar />
        </SnackbarProvider>
      </AuthenticationProvider>
    </ApolloProvider>
  );
};

export default App;
