import { FC, useEffect, useState } from "react";

import "./bigPost.styles.scss";

import UserBar from "../userBar/userBar.component";
import EditButton from "../editButton/editButton.component";
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
};

let hover = false;

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
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newImage, setNewImage] = useState(image);
  const [newHeadline, setNewHeadline] = useState(headline);
  const [newText, setNewText] = useState(text);

  useEffect(() => {
    setNewImage(image);
    setNewHeadline(headline);
    setNewText(text);
  }, [image]);

  const edition = () => {
    if (isEdit) {
      onSavePost(newImage, newHeadline, newText);
    }
    setIsEdit(!isEdit);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <div>
      {currentUser && currentUser.email === user.email && (
        <div
          className="edit-button"
          onClick={() => edition()}
          onMouseOver={() => {
            hover = true;
            setTimeout(() => {
              if (hover) {
                setHovering(true);
              }
            }, 100);
          }}
          onMouseLeave={() => {
            hover = false;
            setHovering(false);
          }}
        >
          <EditButton />
          {hovering && (
            <div className="hovering-text">
              {!isEdit ? "Editing post" : "Save post"}
            </div>
          )}
        </div>
      )}
      {!isEdit ? (
        <div className="newestPost-container">
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
        </div>
      ) : (
        <EditPostForm
          text={newText}
          headline={newHeadline}
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

export default BigPost;
