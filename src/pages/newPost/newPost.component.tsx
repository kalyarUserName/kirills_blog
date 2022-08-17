import React, { useEffect, useState } from "react";
import EditPostForm from "../../components/editPostForm/editPostForm.component";
import { guest } from "../../utils/types";

import "./newPost.styles.scss";
import Button from "../../components/button/button.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { addNewPost } from "../../store/blogs/blogs.actions";
import { BlogItem } from "../../store/blogs/blogs.types";

const defaultNewPost: BlogItem = {
  headline: "",
  imageUrl: "",
  text: "",
  user: guest as UserForDisplay,
  date: "",
  id: "",
  textPreview: "",
};

const NewPost = () => {
  const [post, setPost] = useState(defaultNewPost);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) setPost({ ...post, user: currentUser });
  }, [currentUser]);

  const addPost = () => {
    setPost({
      ...post,
      textPreview: post.text.slice(0, post.text.indexOf(".")) + "...",
      date: new Date().toISOString(),
      id: "200",
    });
    dispatch(addNewPost(post));
    setPost(defaultNewPost);
  };
  const onChangeHeadline = (headline: string) => {
    setPost({ ...post, headline: headline });
  };
  const onChangeImage = (imageSrc: string) => {
    setPost({ ...post, imageUrl: imageSrc });
  };
  const onChangeText = (text: string) => {
    setPost({ ...post, text: text });
  };

  return (
    <div className="create-post-container">
      <div className="headAndButton">
        <h1>Create new Post</h1>
        <Button onClick={addPost} text={"Create new post"} />
      </div>
      <EditPostForm
        text={post.text}
        headline={post.headline}
        image={post.imageUrl}
        onChangeImage={onChangeImage}
        onChangeHeadline={onChangeHeadline}
        onChangeText={onChangeText}
      />
    </div>
  );
};

export default NewPost;
