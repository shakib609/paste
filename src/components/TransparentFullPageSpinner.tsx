import React from "react";

const containerStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  zIndex: 999
};

const spinnerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "40vh 0 0 0",
  margin: "0 auto",
  fontSize: "24px",
  color: "black",
  letterSpacing: "3px"
};

const TransparentFullPageSpinner: React.FC = () => (
  <div style={containerStyle}>
    <h1 style={spinnerStyle}>Loading...</h1>
  </div>
);

export default TransparentFullPageSpinner;
