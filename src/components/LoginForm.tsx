import React from "react";
import { Button, Control, Field, Input, Label } from "rbx";

const LoginForm: React.FC = () => {
  return (
    <form method="post">
      <Field>
        <Label srOnly={true} htmlFor="username-input">
          Username
        </Label>
        <Control>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            id="username-input"
            required
            style={{ borderRadius: 0 }}
          />
        </Control>
      </Field>
      <Field>
        <Label srOnly={true} htmlFor="password-input">
          Password
        </Label>
        <Control>
          <Input
            name="password"
            type="text"
            placeholder="Password"
            id="password-input"
            required
            style={{ borderRadius: 0 }}
          />
        </Control>
      </Field>
      <Field className="has-text-centered">
        <Button color="link" type="submit" style={{ width: "100%" }}>
          Login
        </Button>
      </Field>
    </form>
  );
};

export default LoginForm;
