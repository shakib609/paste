import React from "react";
import {
  Mutation,
  MutationFn,
  MutationResult,
  OperationVariables
} from "react-apollo";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { REGISTER_USER } from "../gqlQueryMutations";
import { useSnackbar } from "../contexts/useSnackbar";

const RegisterForm: React.FC<any> = props => {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: ""
  });

  const { openSnackbar } = useSnackbar();

  const handleChange: (key: string, value: string) => void = (key, value) => {
    setValues({
      ...values,
      [key]: value
    });
  };

  return (
    <React.Fragment>
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={() => {
          openSnackbar("Registered Successfully! Login to Continue");
          props.onModalClose();
        }}
      >
        {(
          registerUser: MutationFn<any, OperationVariables>,
          result: MutationResult<any>
        ) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              registerUser({ variables: { input: { ...values } } });
            }}
          >
            <TextField
              label="First Name"
              margin="dense"
              variant="outlined"
              fullWidth
              autoFocus
              error={!!result.error}
              value={values.firstName}
              onChange={event => handleChange("firstName", event.target.value)}
            />
            <TextField
              label="Last Name"
              margin="dense"
              variant="outlined"
              fullWidth
              error={!!result.error}
              value={values.lastName}
              onChange={event => handleChange("lastName", event.target.value)}
            />
            <TextField
              label="Username"
              autoComplete="username"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              error={!!result.error}
              value={values.username}
              onChange={event => handleChange("username", event.target.value)}
            />
            <TextField
              label="Email"
              autoComplete="email"
              margin="dense"
              variant="outlined"
              type="email"
              fullWidth
              required
              error={!!result.error}
              value={values.email}
              onChange={event => handleChange("email", event.target.value)}
            />
            <TextField
              label="Password"
              autoComplete="password"
              margin="dense"
              variant="outlined"
              type="password"
              fullWidth
              required
              helperText={!!result.error ? result.error.message : ""}
              error={!!result.error}
              value={values.password}
              onChange={event => handleChange("password", event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{
                marginTop: "5px"
              }}
              disabled={result.loading}
            >
              Login
            </Button>
          </form>
        )}
      </Mutation>
    </React.Fragment>
  );
};

export default RegisterForm;
