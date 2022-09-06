import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./signIn.styles.scss";
import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";
import { Link } from "react-router-dom";

import { emailSignInStart } from "../../store/user/user.actions";
import { selectUserError } from "../../store/user/user.selector";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorEnter, setErrorEnter] = useState("");

  const { email, password } = formFields;

  const userAuthError = useSelector(selectUserError);

  useEffect(() => {
    if (userAuthError) {
      switch (userAuthError.message) {
        case "Firebase: Error (auth/user-not-found).":
          setErrorEnter("email");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setErrorEnter("password");
          break;
      }
    }
  }, [userAuthError]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    if (errorEnter !== "" && (name === "password" || name === "email"))
      setErrorEnter("");
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
          error={errorEnter === "email"}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={handleChange}
          error={errorEnter === "password"}
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
