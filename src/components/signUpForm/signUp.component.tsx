import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./signUp.styles.scss";

import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.actions";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { createReferenceToAvatar } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    if (isErrorPassword && (name === "password" || name === "confirmPassword"))
      setIsErrorPassword(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setIsErrorPassword(true);
      return;
      // alert("passwords do not match");
    }
    if (password.length < 6)
      return alert(
        "The password is too short. Use a password of 6 or more symbols"
      );
    const avatarImageUrl =
      imageUrl === "" || !imageUrl
        ? "/images/avatar/default_avatar.png"
        : imageUrl;

    try {
      if (avatarImageUrl) {
        dispatch(signUpStart(email, password, displayName, avatarImageUrl));
        resetFormFields();
      }
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS)
        alert("Cannot create user, email already in use");
      else {
        console.log("user created encountered an error", error);
      }
    }
  };

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      createReferenceToAvatar(event.target.files[0], email, setImageUrl);
    }
  };

  return (
    <div className={"sign-up-container"}>
      <h2>Sign up</h2>
      <h3>
        Sign up with your email and password. Use 6 and more symbol for password
      </h3>
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
          minLength={6}
          value={password}
          error={isErrorPassword}
          required
          onChange={handleChange}
        />
        <FormInput
          label={"Confirm password"}
          type="password"
          name="confirmPassword"
          placeholder="Enter confirm password"
          minLength={6}
          value={confirmPassword}
          error={isErrorPassword}
          required
          onChange={handleChange}
        />
        <FormInput
          label="Avatar image"
          type="file"
          name="imageUrl"
          placeholder="Enter link to avatar"
          onChange={(event) => addImage(event)}
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
