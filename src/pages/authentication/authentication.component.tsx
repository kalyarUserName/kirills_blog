import React from "react";
import "./authentication.styles.scss";
import SignIn from "../../components/signInForm/signIn.component";
import SignUp from "../../components/signUpForm/signUp.component";

const Authentication = () => {
  return (
    <div className={"auth-container"}>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;
