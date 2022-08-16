import React, { useEffect, useState } from "react";
import EditPostForm from "../../components/editPostForm/editPostForm.component";
import { guest } from "../../utils/types";

import "./newPost.styles.scss";
import Button from "../../components/button/button.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const defaultNewPost = {
  headline: "",
  image: "",
  text: "",
  user: guest as UserForDisplay,
};

const NewPost = () => {
  const [post, setPost] = useState(defaultNewPost);
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    if (currentUser) setPost({ ...post, user: currentUser });
  }, [currentUser]);

  const addNewPost = () => {
    //dispatch newPost
    console.log("new post", post);
    setPost(defaultNewPost);
  };
  const onChangeHeadline = (headline: string) => {
    setPost({ ...post, headline: headline });
  };
  const onChangeImage = (imageSrc: string) => {
    setPost({ ...post, image: imageSrc });
  };
  const onChangeText = (text: string) => {
    setPost({ ...post, text: text });
  };

  return (
    <div className="create-post-container">
      <div className="headAndButton">
        <h1>Create new Post</h1>
        <Button onClick={addNewPost} text={"Create new post"} />
      </div>
      <EditPostForm
        text={post.text}
        headline={post.headline}
        image={post.image}
        onChangeImage={onChangeImage}
        onChangeHeadline={onChangeHeadline}
        onChangeText={onChangeText}
      />
    </div>
  );
};

export default NewPost;
