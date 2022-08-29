import { FC, Fragment, useEffect, useState } from "react";

import "./bigPost.styles.scss";

import UserBar from "../userBar/userBar.component";
import EditButton from "../editButton/editButton.component";
import DeleteButton from "../deleteButton/deleteButton.component";
import EditPostForm from "../editPostForm/editPostForm.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";

type NewestPostProps = {
  id: string;
  image: string;
  headline: string;
  text: string;
  user: UserForDisplay;
  date: string;
  toNavigate?: (id: string) => void;
  currentUser: UserForDisplay | null;
  onSavePost: (imageUrl: string, headline: string, text: string) => void;
  onDeletePost: (id: string) => void;
};

const BigPost: FC<NewestPostProps> = ({
  toNavigate,
  id,
  date,
  image,
  headline,
  text,
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
  }, [image]);

  const onEdition = () => {
    if (isEdit) {
      onSavePost(newImage, newHeadline, newText);
    }
    setIsEdit(!isEdit);
  };

  const onDelete = () => {
    onDeletePost(id);
  };

  return (
    <Fragment>
      <div className={`bigPost-container`}>
        <div className={"icons"}>
          <div className="edit-button">
            <EditButton
              isEdit={isEdit}
              isCurrentUserCreator={
                currentUser !== null && currentUser.email === user.email
              }
              onClick={onEdition}
            />
          </div>
          <div className="delete-button">
            <DeleteButton
              isCurrentUserCreator={
                currentUser !== null && currentUser.email === user.email
              }
              onDeleteClick={onDelete}
            />
          </div>
        </div>
        {!isEdit ? (
          <Fragment>
            <div
              className="image"
              onClick={() => (toNavigate ? toNavigate(id) : {})}
            >
              <img src={newImage} alt={headline} id="image" />
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
    </Fragment>
  );
};

export default BigPost;
