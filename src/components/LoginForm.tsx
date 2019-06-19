import React from "react";
import {
  Mutation,
  MutationFn,
  MutationResult,
  OperationVariables
} from "react-apollo";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { OBTAIN_JWT_TOKEN } from "../gqlQueryMutations";

const LoginForm: React.FC<any> = props => {
  const [values, setValues] = React.useState({
    username: "",
    password: ""
  });

  const handleChange: (key: string, value: string) => void = (key, value) => {
    setValues({
      ...values,
      [key]: value
    });
  };

  return (
    <Mutation
      mutation={OBTAIN_JWT_TOKEN}
      onCompleted={(data: any) => {
        const token: string | undefined | null = data.tokenAuth.token;
        if (token) {
          localStorage.setItem("jwtToken", token);
          props.onModalClose();
        }
      }}
    >
      {(
        tokenAuth: MutationFn<any, OperationVariables>,
        result: MutationResult<any>
      ) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            tokenAuth({ variables: { ...values } });
          }}
        >
          <TextField
            label="Username"
            autoComplete="username"
            autoFocus
            margin="dense"
            variant="outlined"
            fullWidth
            required
            error={!!result.error}
            value={values.username}
            onChange={event => handleChange("username", event.target.value)}
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
  );
};

export default LoginForm;
