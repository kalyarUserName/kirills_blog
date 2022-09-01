import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";
import "./bigPost.styles.scss";

import UserBar from "../userBar/userBar.component";
import EditPostForm from "../editPostForm/editPostForm.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import ButtonsForCreator from "../buttonsForCreator/buttonsForCreator.component";

type NewestPostProps = {
  id: string;
  images: string[];
  headline: string;
  text: string;
  user: UserForDisplay;
  date: string;
  toNavigate?: (id: string) => void;
  currentUser: UserForDisplay | null;
  onSavePost: (imageUrl: string[], headline: string, text: string) => void;
  onDeletePost: (id: string) => void;
};

const BigPost: FC<NewestPostProps> = ({
  toNavigate,
  id,
  date,
  images,
  headline,
  text,
  user,
  currentUser,
  onSavePost,
  onDeletePost,
}) => {
  const [newImages, setNewImages] = useState(images);
  const [newHeadline, setNewHeadline] = useState(headline);
  const [newText, setNewText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setNewImages(images);
    setNewHeadline(headline);
    setNewText(text);
  }, [images, headline, text]);

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

  return (
    <div className={`bigPost-container`}>
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
          <Splide aria-label={headline} className="image">
            {newImages &&
              newImages.map((newImage, index) => (
                <SplideSlide key={index}>
                  <img src={newImage} alt={`headline ${index + 1}`} />
                </SplideSlide>
              ))}
          </Splide>
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
                date={date}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <EditPostForm
          id={id}
          user={user}
          text={newText}
          headline={newHeadline}
          images={newImages}
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
