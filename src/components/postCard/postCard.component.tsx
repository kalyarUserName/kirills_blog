import React, { FC, Fragment, useMemo } from "react";
import { useDispatch } from "react-redux";

import "./postCard.styles.scss";

import { updatePost } from "../../store/blogs/blogs.actions";
import { BlogItem } from "../../store/blogs/blogs.types";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import { downRatingOfPost, upRatingOfPost } from "../../utils/general";

import ButtonsForCreator from "../buttonsForCreator/buttonsForCreator.component";
import Slider, { SliderSize } from "../slider/slider.component";
import RatingPanel from "../ratingPanel/ratingPanel.component";

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
  const { id, imagesUrl, headline, textPreview, user, rating } = post;
  const dispatch = useDispatch();

  const onDelete = () => {
    onDeletePost(id);
  };

  const isCurUserCreator = useMemo(
    () => currentUser !== null && currentUser.email === user.email,
    [currentUser, user]
  );

  const onArrowUpClick = () => {
    if (!currentUser) return;
    const newRating = upRatingOfPost(rating, currentUser.email);
    console.log(rating, newRating);
    if (!rating) return;
    if (rating.count === newRating.count) return;
    dispatch(updatePost({ ...post, rating: newRating }));
  };

  const onArrowDownClick = () => {
    if (!currentUser) return;
    const newRating = downRatingOfPost(rating, currentUser.email);
    console.log(rating, newRating);
    if (!rating) return;
    if (rating.count === newRating.count) return;
    dispatch(updatePost({ ...post, rating: newRating }));
  };

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
      <div className={"rating-panel-container"}>
        <RatingPanel
          onArrowUpClick={onArrowUpClick}
          onArrowDownClick={onArrowDownClick}
          count={rating ? rating.count : 0}
        />
      </div>
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
