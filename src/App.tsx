import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TransparentFullPageSpinner from "./components/TransparentFullPageSpinner";

const NewPaste = React.lazy(() => import("./pages/NewPaste"));

const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<TransparentFullPageSpinner />}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={NewPaste} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
