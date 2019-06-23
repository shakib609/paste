import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  }
}));

const LoadingSpinner: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress size={32} color="primary" />
    </div>
  );
};

export default LoadingSpinner;
