import React, { FC } from "react";

import "./postCard.styles.scss";

import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import DeleteButton from "../deleteButton/deleteButton.component";

type PostCardProps = {
  id: string;
  image: string;
  headline: string;
  textPreview: string;
  toNavigate: (id: string) => void;
  user: UserForDisplay;
  currentUser: UserForDisplay | null;
  onDeletePost: (id: string) => void;
};

const PostCard: FC<PostCardProps> = ({
  toNavigate,
  id,
  image,
  headline,
  textPreview,
  user,
  currentUser,
  onDeletePost,
}) => {
  const onDelete = () => onDeletePost(id);

  return (
    <div className={`postCard-container`}>
      <div className={"delete-button"}>
        <DeleteButton
          isCurrentUserCreator={
            currentUser !== null && currentUser.email === user.email
          }
          onDeleteClick={onDelete}
        />
      </div>
      <div className={"image-container"} onClick={() => toNavigate(id)}>
        <img src={image} alt={headline} />
      </div>
      <div className={"post-container"} onClick={() => toNavigate(id)}>
        <h2>{headline}</h2>
        <p>{textPreview}</p>
      </div>
    </div>
  );
};

export default PostCard;
