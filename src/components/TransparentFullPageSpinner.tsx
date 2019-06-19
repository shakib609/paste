import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const containerStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  zIndex: 9999
};

const spinnerStyle: React.CSSProperties = {
  position: "absolute",
  top: "45%",
  left: "45%"
};

const TransparentFullPageSpinner: React.FC = () => (
  <div style={containerStyle}>
    <CircularProgress style={spinnerStyle} color="primary" />
  </div>
);

export default TransparentFullPageSpinner;
