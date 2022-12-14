import React, { Fragment, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Header from "./pages/header/header.component";
import Home from "./pages/home/home.component";
import NewPost from "./pages/newPost/newPost.component";
import Blog from "./pages/blog/blog.component";
import SignIn from "./components/signInForm/signIn.component";
import SignUp from "./components/signUpForm/signUp.component";

import { selectCurrentUser } from "./store/user/user.selector";
import { fetchBlogsStart } from "./store/blogs/blogs.actions";
import { testAttr } from "./utils/tests/testsUtils";
import Modal from "./components/modal/modal.component";

function App() {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchBlogsStart());
  }, [dispatch]);

  return (
    <div className={"App"} {...testAttr("app")}>
      <Modal />

      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          {currentUser ? (
            <Fragment>
              <Route path="sign-in" element={<Navigate replace to={"/"} />} />
              <Route path="sign-up" element={<Navigate replace to={"/"} />} />
              <Route path="new-post" element={<NewPost />} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="new-post" element={<Navigate replace to={"/"} />} />
            </Fragment>
          )}
          <Route path="blog" element={<Blog />}>
            <Route path=":blogId"></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
