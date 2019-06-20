import React from "react";

export const AuthenticationContext = React.createContext<any>(null);

export const useAuthentication = () => {
  const context = React.useContext(AuthenticationContext);
  if (!context)
    throw new Error("useAuthentication must be inside AuthenticationProvider.");
  const [authToken, setAuthToken] = context;

  const login = (token: string) => {
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(null);
  };

  return { authToken, login, logout, context };
};

export const AuthenticationProvider: React.FC = props => {
  const token = localStorage.getItem("jwtToken");
  const [authToken, setAuthToken] = React.useState(token || null);
  const value = React.useMemo(() => [authToken, setAuthToken], [authToken]);
  return <AuthenticationContext.Provider value={value} {...props} />;
};
