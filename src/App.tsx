import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/header/header.component";
import Home from "./pages/home/home.component";
import Authentication from "./pages/authentication/authentication.component";
import NewPost from "./pages/newPost/newPost";
import Blog from "./pages/blog/blog.component";

function App() {
  return (
    <div className={"App"}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="sign" element={<Authentication />} />
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
