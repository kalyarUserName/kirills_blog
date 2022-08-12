import { useState, FormEvent, ChangeEvent } from "react";

import "./signIn.styles.scss";
import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";
import { Link } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("try to sign in");
    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className={"sign-in-container"}>
      <h2>Sign in</h2>
      <h3>Sign in with your email and password</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={handleChange}
        />
        <div className={"button-container"}>
          <Button type="submit" text="SIGN IN"></Button>
        </div>
        <br />
        <div className="link">
          <Link to={"/sign-up"}>Don't have an account? Sign up!</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
