import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./blog.styles.scss";

import BigPost from "../../components/bigPost/bigPost.component";
import Comments from "../../components/comments/comments.component";
import Spinner from "../../components/spinner/spinner.component";

import { BlogItem, Comment } from "../../store/blogs/blogs.types";
import { selectBlogs, selectBlogsMap } from "../../store/blogs/blogs.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { updatePost } from "../../store/blogs/blogs.actions";
import {
  getBlogsId,
  gettingID,
  UserForDisplay,
} from "../../utils/firebase/firebase.utils";
import { changePost, isChangesPost } from "../../utils/general";

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

  // let post: BlogItem = defaultPost;
  const [post, setPost] = useState(defaultPost);

  const blogsMap = useSelector(selectBlogsMap);
  const blogs = useSelector(selectBlogs);
  const currentUser = useSelector(selectCurrentUser);

  if (!id && blogs.length !== 0) setPost(blogs[0].items[0]);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    Object.keys(blogsMap).map((email) => {
      const blogs = blogsMap[email];
      const res = blogs.find((blog) => blog.id === id);
      if (res) {
        setPost(res);
      }
    });
  }, [blogsMap, id]);

  console.log("render", post.comments);

  const onSaveChangesPost = (
    imageUrl: string,
    headline: string,
    text: string
  ) => {
    if (isChangesPost(post, imageUrl, headline, text)) {
      setPost(changePost(post, imageUrl, headline, text));
      dispatch(updatePost(post));
    }
  };

  const onCommentSend = async (message: string) => {
    if (message === "" || !currentUser) return;
    const date = new Date().toISOString();
    const newID = await getBlogsId(gettingID.ID_COMMENT).then((value) => value);
    const newComment: Comment = {
      id: newID.toString(),
      date: date,
      text: message,
      user: currentUser,
    };

    if (post.comments) post.comments.unshift(newComment);
    else {
      setPost({ ...post, comments: [newComment] });
    }

    dispatch(updatePost(post));
  };

  const onSaveComment = (id: string, text: string) => {
    if (text === "" || !currentUser) return;
    const newComment: Comment = {
      id: id,
      user: currentUser,
      text: text,
      date: new Date().toISOString(),
    };
    const updPostComments = post.comments?.map((comment) => {
      return comment.id !== id ? comment : newComment;
    });
    dispatch(updatePost({ ...post, comments: updPostComments }));
    setPost({ ...post, comments: updPostComments });
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
          <Comments
            comments={post.comments}
            currentUser={currentUser}
            onSendComment={onCommentSend}
            onSaveComment={onSaveComment}
          />
        </Fragment>
      )}
    </div>
  );
};

export default BlogPage;
