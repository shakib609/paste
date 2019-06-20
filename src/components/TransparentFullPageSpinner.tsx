import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const containerStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.65)",
  zIndex: 9999
};

const TransparentFullPageSpinner: React.FC = () => (
  <div style={containerStyle}>
    <CircularProgress color="primary" />
  </div>
);

export default TransparentFullPageSpinner;
