import React from "react";
import MaterialSnackbar from "@material-ui/core/Snackbar";

import { useSnackbar } from "../contexts/useSnackbar";

const Snackbar: React.FC = () => {
  const { snackbarValues, closeSnackbar } = useSnackbar();
  return (
    <MaterialSnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={snackbarValues.open}
      message={snackbarValues.message}
      autoHideDuration={10000}
      onClose={closeSnackbar}
    />
  );
};

export default Snackbar;
