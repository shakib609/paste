import React from "react";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/Navbar";
import TransparentFullPageSpinner from "./components/TransparentFullPageSpinner";

const NewPaste = React.lazy(() => import("./pages/NewPaste"));

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <React.Suspense fallback={<TransparentFullPageSpinner />}>
        <Router>
          <NewPaste path="/" />
        </Router>
      </React.Suspense>
    </React.Fragment>
  );
};

export default App;
