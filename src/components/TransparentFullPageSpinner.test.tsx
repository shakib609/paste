import React from "react";
import ReactDOM from "react-dom";
import TransparentFullPageSpinner from "./TransparentFullPageSpinner";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TransparentFullPageSpinner />, div);
  ReactDOM.unmountComponentAtNode(div);
});
