import React from "react";
import { useParams } from "react-router-dom";

import "./blog.styles.scss";

import BigPost from "../../components/bigPost/bigPost.component";

import Comments from "../../components/comments/comments.component";

import { BlogItem } from "../../store/blogs/blogs.types";
import { useSelector } from "react-redux";
import { selectBlogsMap } from "../../store/blogs/blogs.selector";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";

const BlogPage = () => {
  const params = useParams();
  const id = params.blogId;

  const defaultPost: BlogItem = {
    id: "",
    imageUrl: "",
    headline: "",
    textPreview: "",
    text: "",
    user: {} as UserForDisplay,
    date: "",
  };

  const blogsMap = useSelector(selectBlogsMap);
  let post: BlogItem = defaultPost;
  Object.keys(blogsMap).map((email) => {
    const blogs = blogsMap[email];
    const res = blogs.find((blog) => blog.id === id);
    if (res) {
      post = res;
    }
  });

  // let post = dataPosts.find((post) => post.id.toString() === id);

  return (
    <div className={"blog-container"}>
      <BigPost
        id={post.id}
        image={post.imageUrl}
        headline={post.headline}
        textPreview={post.textPreview}
        user={post.user}
        date={post.date.slice(0, 10)}
      />
      <hr />
      <Comments />
    </div>
  );
};

export default BlogPage;
