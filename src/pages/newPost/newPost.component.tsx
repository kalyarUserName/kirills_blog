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
import { defaultRating } from "../../utils/general";

const defaultNewPost: BlogItem = {
  id: "",
  headline: "",
  imagesUrl: [],
  text: "",
  textPreview: "",
  user: guest as UserForDisplay,
  date: "",
};

const NewPost = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [post, setPost] = useState(defaultNewPost);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (currentUser) setPost({ ...post, user: currentUser });
  }, [currentUser, setPost]);

  const addPost = async () => {
    setIsProcessing(true);
    const newID = await getBlogsId(gettingID.ID_POST).then((value) => value);
    const newDate = new Date().toISOString();
    const newTextPreview = post.text.slice(0, post.text.indexOf(".")) + "...";
    const newPost: BlogItem = {
      id: newID.toString(),
      headline: post.headline,
      imagesUrl:
        post.imagesUrl.length === 0 || post.imagesUrl[0] === ""
          ? ["/images/blank/blankPhoto1.png"]
          : post.imagesUrl,
      text: post.text,
      textPreview: newTextPreview,
      user: post.user,
      date: newDate,
      rating: defaultRating,
    };
    if (newPost.text === "" && newPost.headline === "") return;
    dispatch(addNewPost(newPost));
    setPost(defaultNewPost);
    setIsProcessing(false);
  };

  const onChangeHeadline = (headline: string) => {
    setPost({ ...post, headline: headline });
  };

  const onChangeImage = (imagesSrc: string[]) => {
    setPost({ ...post, imagesUrl: imagesSrc });
  };

  const onChangeText = (text: string) => {
    setPost({ ...post, text: text });
  };

  return (
    <div className="create-post-container">
      <div className="headAndButton">
        <h1>Create new Post</h1>
        <Button
          onClick={addPost}
          text={"Create new post"}
          isLoading={isProcessing}
        />
      </div>
      <EditPostForm
        post={post}
        onChangeImages={onChangeImage}
        onChangeHeadline={onChangeHeadline}
        onChangeText={onChangeText}
      />
      <div className="button-container-for-mobile">
        <Button onClick={addPost} text={"Create new post"} />
      </div>
    </div>
  );
};

export default NewPost;
