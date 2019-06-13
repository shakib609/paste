import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
    </Router>
  );
};

export default App;
