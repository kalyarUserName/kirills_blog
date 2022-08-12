import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/header/header.component";
import Home from "./pages/home/home.component";
import NewPost from "./pages/newPost/newPost.component";
import Blog from "./pages/blog/blog.component";
import SignIn from "./components/signInForm/signIn.component";
import SignUp from "./components/signUpForm/signUp.component";

function App() {
  return (
    <div className={"App"}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          {/*<Route path="sign" element={<Authentication />} />*/}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
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
