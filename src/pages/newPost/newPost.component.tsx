import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./newPost.styles.scss";

import EditPostForm from "../../components/editPostForm/editPostForm.component";
import Button from "../../components/button/button.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { addNewPost } from "../../store/blogs/blogs.actions";
import { BlogItem } from "../../store/blogs/blogs.types";
import { guest } from "../../utils/types";
import {
  getBlogsId,
  gettingID,
  UserForDisplay,
} from "../../utils/firebase/firebase.utils";

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
  const dispatch = useDispatch();

  const [post, setPost] = useState(defaultNewPost);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) setPost({ ...post, user: currentUser });
  }, [currentUser]);

  const addPost = async () => {
    const newID = await getBlogsId(gettingID.ID_POST).then((value) => value);
    const newDate = new Date().toISOString();
    const newTextPreview = post.text.slice(0, post.text.indexOf(".")) + "...";
    const newPost: BlogItem = {
      id: newID.toString(),
      imageUrl: post.imageUrl,
      date: newDate,
      text: post.text,
      textPreview: newTextPreview,
      headline: post.headline,
      user: post.user,
    };
    dispatch(addNewPost(newPost));
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
