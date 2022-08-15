import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

import Header from "./pages/header/header.component";
import Home from "./pages/home/home.component";
import NewPost from "./pages/newPost/newPost.component";
import Blog from "./pages/blog/blog.component";
import SignIn from "./components/signInForm/signIn.component";
import SignUp from "./components/signUpForm/signUp.component";

import { selectCurrentUser } from "./store/user/user.selector";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className={"App"}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          {currentUser ? (
            <Fragment>
              <Route
                path={"sign-in" || "sign-up"}
                element={<Navigate replace to={"/"} />}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
            </Fragment>
          )}
          {/*<Route path="sign-in" element={<SignIn />} />*/}
          {/*<Route path="sign-up" element={<SignUp />} />*/}
          <Route path="new-post" element={<NewPost />} />
          <Route path="blog" element={<Blog />}>
            <Route path=":blogId"></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
