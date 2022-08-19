import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./signUp.styles.scss";

import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.actions";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  imageUrl: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword, imageUrl } =
    formFields;

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

    const avatarImageUrl =
      imageUrl === "" ? "/images/avatar/default_avatar.png" : imageUrl;

    try {
      dispatch(signUpStart(email, password, displayName, avatarImageUrl));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS)
        alert("Cannot create user, email already in use");
      else {
        console.log("user created encountered an error", error);
      }
    }
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
        <FormInput
          label={"Avatar link"}
          type="text"
          name="imageUrl"
          placeholder="Enter link to avatar"
          value={imageUrl}
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
