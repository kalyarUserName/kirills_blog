import { FC, useEffect, useState } from "react";

import "./bigPost.styles.scss";

import UserBar from "../userBar/userBar.component";
import EditButton from "../editButton/editButton.component";
import { User, Users } from "../../utils/types";
import EditPostForm from "../editPostForm/editPostForm.component";

type NewestPostProps = {
  id: number;
  image: string;
  headline: string;
  textPreview: string;
  user: User;
  date: string;
  toNavigate?: (id: number) => void;
};

let hover = false;

const BigPost: FC<NewestPostProps> = ({
  toNavigate,
  id,
  date,
  image,
  headline,
  textPreview,
  user,
}) => {
  const currentUser = Users[0];

  const [isEdit, setIsEdit] = useState(false);
  const [newImage, setNewImage] = useState(image);
  const [newHeadline, setNewHeadline] = useState(headline);
  const [newText, setNewText] = useState(textPreview);

  const edition = () => {
    setIsEdit(!isEdit);
    // if (isEdit) setEditionElemSize();
  };

  const [hovering, setHovering] = useState(false);

  return (
    <div>
      {JSON.stringify(currentUser) === JSON.stringify(user) && (
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
              <UserBar image={user.image} name={user.name} date={date} />
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
            console.log("headlineT => ", headlineT);
            setNewHeadline(headlineT);
          }}
          onChangeText={(textT) => {
            console.log("textT => ", textT);
            setNewText(textT);
          }}
        />
      )}
    </div>
  );
};

export default BigPost;
