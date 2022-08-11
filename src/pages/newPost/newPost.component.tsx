import React, { useState } from "react";
import EditPostForm from "../../components/editPostForm/editPostForm.component";
import { Users } from "../../utils/types";

import "./newPost.styles.scss";

const NewPost = () => {
  const currentUser = Users[0];
  const [newImage, setNewImage] = useState("");
  const [newHeadline, setNewHeadline] = useState("");
  const [newText, setNewText] = useState("");

  const mock = (s: string) => {};
  return (
    <div className="create-post-container">
      <div className="headAndButton">
        <h1>Create new Post</h1> <button>Create new post</button>
      </div>
      <EditPostForm
        text={""}
        headline={""}
        onChangeImage={mock}
        onChangeHeadline={mock}
        onChangeText={mock}
      />
    </div>
  );
};

export default NewPost;
