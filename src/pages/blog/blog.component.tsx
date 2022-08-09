import React from "react";
import { useParams } from "react-router-dom";

import "./blog.styles.scss";

import BigPost from "../../components/bigPost/bigPost.component";

import { dataPosts } from "../home/home.component";
import Comments from "../../components/comments/comments.component";

const Blog = () => {
  const params = useParams();
  const id = params.blogId;
  let post = dataPosts.find((post) => post.id.toString() === id);

  if (!post) post = dataPosts[0];

  return (
    <div className={"blog-container"}>
      <BigPost
        id={post.id}
        image={post.image}
        headline={post.headline}
        textPreview={post.textPreview}
        user={post.user}
        date={post.date}
      />
      <hr />
      <h2>Comments:</h2>
      <Comments />
    </div>
  );
};

export default Blog;
