import React from "react";

export const SnackbarContext = React.createContext<any>(null);

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be inside a SnackbarProvider");

  const [snackbarValues, setSnackbarValues] = context;
  const openSnackbar = (message: string) =>
    setSnackbarValues({
      open: true,
      message
    });
  const closeSnackbar = () =>
    setSnackbarValues({ ...snackbarValues, open: false });
  return {
    context,
    openSnackbar,
    closeSnackbar,
    snackbarValues
  };
};

export const SnackbarProvider: React.FC = props => {
  const [snackbarValues, setSnackbarValues] = React.useState({
    open: false,
    message: ""
  });
  const value = React.useMemo(() => [snackbarValues, setSnackbarValues], [
    snackbarValues
  ]);
  return <SnackbarContext.Provider value={value} {...props} />;
};
