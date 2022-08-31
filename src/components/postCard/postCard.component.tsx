import React, { FC, Fragment, useEffect, useMemo, useState } from "react";

import "./postCard.styles.scss";

import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import ButtonsForCreator from "../buttonsForCreator/buttonsForCreator.component";
import EditPostForm from "../editPostForm/editPostForm.component";

type PostCardProps = {
  id: string;
  image: string;
  text: string;
  headline: string;
  textPreview: string;
  toNavigate: (id: string) => void;
  user: UserForDisplay;
  currentUser: UserForDisplay | null;
  onSavePost: (imageUrl: string, headline: string, text: string) => void;
  onDeletePost: (id: string) => void;
};

const PostCard: FC<PostCardProps> = ({
  toNavigate,
  id,
  image,
  headline,
  text,
  textPreview,
  user,
  currentUser,
  onSavePost,
  onDeletePost,
}) => {
  const [newImage, setNewImage] = useState(image);
  const [newHeadline, setNewHeadline] = useState(headline);
  const [newText, setNewText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setNewImage(image);
    setNewHeadline(headline);
    setNewText(text);
  }, [image, headline, text]);

  const onEdit = () => {
    if (isEdit) {
      onSavePost(newImage, newHeadline, newText);
    }
    setIsEdit(!isEdit);
  };

  const onDelete = () => {
    onDeletePost(id);
  };

  const isCurUserCreator = useMemo(
    () => currentUser !== null && currentUser.email === user.email,
    [currentUser, user]
  );

  return (
    <div className={`postCard-container ${!isEdit ? "card" : "bigCard"}`}>
      {isCurUserCreator && (
        <div className={`buttons`}>
          <ButtonsForCreator
            onDeleteClick={onDelete}
            onEditClick={onEdit}
            isDelete={true}
          />
        </div>
      )}
      {!isEdit ? (
        <Fragment>
          <div className={"image-container"} onClick={() => toNavigate(id)}>
            <img src={image} alt={headline} />
          </div>
          <div className={"post-container"} onClick={() => toNavigate(id)}>
            <h2>{headline}</h2>
            <p>{textPreview}</p>
          </div>
        </Fragment>
      ) : (
        <EditPostForm
          id={id}
          user={user}
          text={newText}
          headline={newHeadline}
          image={newImage}
          onChangeImage={(imageT) => {
            setNewImage(imageT);
          }}
          onChangeHeadline={(headlineT) => {
            setNewHeadline(headlineT);
          }}
          onChangeText={(textT) => {
            setNewText(textT);
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
