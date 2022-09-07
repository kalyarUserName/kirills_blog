import React, { FC, Fragment, useMemo } from "react";

import "./postCard.styles.scss";

import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import ButtonsForCreator from "../buttonsForCreator/buttonsForCreator.component";
import Slider, { SliderSize } from "../slider/slider.component";
import { BlogItem } from "../../store/blogs/blogs.types";

type PostCardProps = {
  post: BlogItem;
  toNavigate: (id: string) => void;
  currentUser: UserForDisplay | null;
  onSavePost: (imagesUrl: string[], headline: string, text: string) => void;
  onDeletePost: (id: string) => void;
};

const PostCard: FC<PostCardProps> = ({
  toNavigate,
  post,
  currentUser,
  onDeletePost,
}) => {
  const { id, imagesUrl, headline, textPreview, user } = post;

  const onDelete = () => {
    onDeletePost(id);
  };

  const isCurUserCreator = useMemo(
    () => currentUser !== null && currentUser.email === user.email,
    [currentUser, user]
  );

  return (
    <div className={`postCard-container card`}>
      {isCurUserCreator && (
        <div className={`buttons`}>
          <ButtonsForCreator
            onDeleteClick={onDelete}
            onEditClick={() => {}}
            isDelete={true}
          />
        </div>
      )}
      <Fragment>
        <div className={"image-container"} onClick={() => toNavigate(id)}>
          <Slider
            images={imagesUrl}
            headline={headline}
            size={SliderSize.card}
          />
        </div>
        <div className={"post-container"} onClick={() => toNavigate(id)}>
          <h2>{headline}</h2>
          <p>{textPreview}</p>
        </div>
      </Fragment>
    </div>
  );
};

export default PostCard;
