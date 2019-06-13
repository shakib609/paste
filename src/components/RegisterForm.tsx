import React from "react";
import { Button, Control, Field, Input, Label } from "rbx";

const RegisterForm: React.FC = () => {
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
        <Label srOnly={true} htmlFor="email-input">
          Email
        </Label>
        <Control>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            id="email-input"
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
            type="password"
            placeholder="Password"
            id="password-input"
            required
            style={{ borderRadius: 0 }}
          />
        </Control>
      </Field>

      <Field>
        <Label srOnly={true} htmlFor="confirm-password-input">
          Confirm Password
        </Label>
        <Control>
          <Input
            name="confirm-password"
            type="password"
            placeholder="Confirm Password"
            id="confirm-password-input"
            required
            style={{ borderRadius: 0 }}
          />
        </Control>
      </Field>

      <Field className="has-text-centered">
        <Button color="link" type="submit" style={{ width: "100%" }}>
          Register
        </Button>
      </Field>
    </form>
  );
};

export default RegisterForm;
