import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./blog.styles.scss";

import BigPost from "../../components/bigPost/bigPost.component";
import Comments from "../../components/comments/comments.component";
import Spinner from "../../components/spinner/spinner.component";

import { BlogItem, Comment } from "../../store/blogs/blogs.types";
import { selectBlogs, selectBlogsMap } from "../../store/blogs/blogs.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { deletePost, updatePost } from "../../store/blogs/blogs.actions";
import {
  getBlogsId,
  gettingID,
  UserForDisplay,
} from "../../utils/firebase/firebase.utils";
import { changePost, isChangesPost } from "../../utils/general";

const defaultPost: BlogItem = {
  id: "",
  imagesUrl: [],
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
  const navigate = useNavigate();

  const [post, setPost] = useState(defaultPost);

  const blogsMap = useSelector(selectBlogsMap);
  const blogs = useSelector(selectBlogs);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!id && blogs.length !== 0) {
      if (blogs[0].items.length !== 0) {
        setPost(blogs[0].items[0]);
      } else {
        setPost(blogs[1].items[0]);
      }
    } else {
      // eslint-disable-next-line array-callback-return
      Object.keys(blogsMap).map((email) => {
        const blogs = blogsMap[email];
        const res = blogs.find((blog) => blog.id === id);
        if (res) {
          setPost(res);
        }
      });
    }
  }, [blogsMap, id, blogs]);

  const onSaveChangesPost = (
    imagesUrl: string[],
    headline: string,
    text: string
  ) => {
    if (isChangesPost(post, imagesUrl, headline, text)) {
      dispatch(updatePost(changePost(post, imagesUrl, headline, text)));
      setPost(changePost(post, imagesUrl, headline, text));
    }
  };

  const onCommentSend = async (message: string) => {
    if (message === "" || !currentUser) {
      alert("To leave a comment, you need to log in to your account");
      navigate("/sign-in");
      return;
    }
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

  const onDeletePost = (_postId: string) => {
    const deletingPost = post;
    if (deletingPost !== defaultPost) {
      dispatch(deletePost(deletingPost));
      navigate("/blog");

      if (!id && blogs.length !== 0) {
        if (blogs[0].items.length !== 0) {
          setPost(blogs[0].items[0]);
        } else {
          setPost(blogs[1].items[0]);
        }
      }
    }
  };

  const onDeleteComment = (commentId: string) => {
    const newComments = post.comments?.filter(
      (comment) => comment.id !== commentId
    );
    const updPost = { ...post, comments: newComments };
    dispatch(updatePost(updPost));
    setPost(updPost);
  };

  return (
    <div className={"blog-container"}>
      {post === defaultPost ? (
        <Spinner />
      ) : (
        <Fragment>
          <BigPost
            id={post.id}
            images={post.imagesUrl}
            headline={post.headline}
            text={post.text}
            user={post.user}
            date={post.date.slice(0, 10)}
            currentUser={currentUser}
            onSavePost={onSaveChangesPost}
            onDeletePost={onDeletePost}
          />
          <hr />
          <Comments
            comments={post.comments}
            currentUser={currentUser}
            onSendComment={onCommentSend}
            onSaveComment={onSaveComment}
            onDeleteComment={onDeleteComment}
          />
        </Fragment>
      )}
    </div>
  );
};

export default BlogPage;
