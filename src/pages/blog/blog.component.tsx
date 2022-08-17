import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import "./blog.styles.scss";

import BigPost from "../../components/bigPost/bigPost.component";

import Comments from "../../components/comments/comments.component";

import { BlogItem } from "../../store/blogs/blogs.types";
import { useDispatch, useSelector } from "react-redux";
import { selectBlogs, selectBlogsMap } from "../../store/blogs/blogs.selector";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import Spinner from "../../components/spinner/spinner.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { changePost, isChangesPost } from "../../utils/general";
import { updatePost } from "../../store/blogs/blogs.actions";

const defaultPost: BlogItem = {
  id: "",
  imageUrl: "",
  headline: "",
  textPreview: "",
  text: "",
  user: {} as UserForDisplay,
  date: "",
};

const BlogPage = () => {
  const params = useParams();
  const id = params.blogId;

  const dispatch = useDispatch();

  let post: BlogItem = defaultPost;

  const blogsMap = useSelector(selectBlogsMap);
  const blogs = useSelector(selectBlogs);
  const currentUser = useSelector(selectCurrentUser);

  if (!id && blogs.length !== 0) post = blogs[0].items[0];

  Object.keys(blogsMap).map((email) => {
    const blogs = blogsMap[email];
    const res = blogs.find((blog) => blog.id === id);
    if (res) {
      post = res;
    }
  });

  const onSaveChangesPost = (
    imageUrl: string,
    headline: string,
    text: string
  ) => {
    if (isChangesPost(post, imageUrl, headline, text)) {
      dispatch(updatePost(changePost(post, imageUrl, headline, text)));
      post = changePost(post, imageUrl, headline, text);
    }
  };

  return (
    <div className={"blog-container"}>
      {post === defaultPost ? (
        <Spinner />
      ) : (
        <Fragment>
          <BigPost
            id={post.id}
            image={post.imageUrl}
            headline={post.headline}
            text={post.text}
            user={post.user}
            date={post.date.slice(0, 10)}
            currentUser={currentUser}
            onSavePost={onSaveChangesPost}
          />
          <hr />
          <Comments />
        </Fragment>
      )}
    </div>
  );
};

export default BlogPage;
