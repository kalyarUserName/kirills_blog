import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../formInput/formInput.component";

import "./signUp.styles.scss";
import Button from "../button/button.component";
import { Link } from "react-router-dom";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    console.log("try to sign up");
    resetFormFields();
  };

  return (
    <div className={"sign-up-container"}>
      <h2>Sign up</h2>
      <h3>Sign up with your email and password</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display name"}
          type="text"
          name="displayName"
          placeholder="Enter your name"
          value={displayName}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Email"}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Password"}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Confirm password"}
          type="password"
          name="confirmPassword"
          placeholder="Enter confirm password"
          value={confirmPassword}
          required
          onChange={handleChange}
        />
        <div className="button-container">
          <Button type="submit" text="SIGN UP"></Button>
        </div>
        <br />
        <div className="link">
          <Link to={"/sign-up"}>Have an account? Sign in!</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
