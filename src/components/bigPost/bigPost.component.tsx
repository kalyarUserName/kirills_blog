import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import "./bigPost.styles.scss";

import { BlogItem } from "../../store/blogs/blogs.types";
import { updatePost } from "../../store/blogs/blogs.actions";
import { downRatingOfPost, upRatingOfPost } from "../../utils/general";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";

import UserBar from "../userBar/userBar.component";
import EditPostForm from "../editPostForm/editPostForm.component";
import ButtonsForCreator from "../buttonsForCreator/buttonsForCreator.component";
import Slider from "../slider/slider.component";
import RatingPanel from "../ratingPanel/ratingPanel.component";

type BigPostProps = {
  post: BlogItem;
  toNavigate?: (id: string) => void;
  currentUser: UserForDisplay | null;
  onSavePost: (imageUrl: string[], headline: string, text: string) => void;
  onDeletePost: (id: string) => void;
};

const BigPost: FC<BigPostProps> = ({
  toNavigate,
  post,
  currentUser,
  onSavePost,
  onDeletePost,
}) => {
  const { id, date, imagesUrl, headline, text, user, rating } = post;
  const dateSlice = date.slice(0, 10);

  const dispatch = useDispatch();

  const [newImages, setNewImages] = useState(imagesUrl);
  const [newHeadline, setNewHeadline] = useState(headline);
  const [newText, setNewText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setNewImages(imagesUrl);
    setNewHeadline(headline);
    setNewText(text);
  }, [imagesUrl, headline, text]);

  const onEdit = () => {
    if (isEdit) {
      onSavePost(newImages, newHeadline, newText);
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
  const onArrowUpClick = () => {
    if (!currentUser) return;
    const newRating = upRatingOfPost(rating, currentUser.email);

    if (!rating) return;
    if (rating.count === newRating.count) return;

    dispatch(updatePost({ ...post, rating: newRating }));
  };

  const onArrowDownClick = () => {
    if (!currentUser) return;
    const newRating = downRatingOfPost(rating, currentUser.email);

    if (!rating) return;
    if (rating.count === newRating.count) return;

    dispatch(updatePost({ ...post, rating: newRating }));
  };

  return (
    <div className={`bigPost-container`}>
      <div className={"rating-panel-container"}>
        <RatingPanel
          onArrowUpClick={onArrowUpClick}
          onArrowDownClick={onArrowDownClick}
          count={rating ? rating.count : 0}
        />
      </div>
      {isCurUserCreator && (
        <div className={"buttons-for-creator-container"}>
          <ButtonsForCreator
            onDeleteClick={onDelete}
            onEditClick={onEdit}
            isDelete={true}
            isEditing={true}
          />
        </div>
      )}
      {!isEdit ? (
        <Fragment>
          <div className="image">
            <Slider images={newImages} headline={newHeadline} />
          </div>
          <div className="post-container">
            <h2
              id="headline"
              onClick={() => (toNavigate ? toNavigate(id) : {})}
            >
              {newHeadline}
            </h2>
            <p id="text">{newText}</p>
            <div className="userbar">
              <UserBar
                image={user.imageUrl}
                name={user.displayName}
                date={dateSlice}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <EditPostForm
          post={post}
          onChangeImages={(imageT: string[]) => {
            setNewImages(imageT);
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

export default BigPost;
