import { FC, useState } from "react";

import "./bigPost.styles.scss";

import UserBar from "../userBar/userBar.component";
import EditButton from "../editButton/editButton.component";
import EditPostForm from "../editPostForm/editPostForm.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

type NewestPostProps = {
  id: string;
  image: string;
  headline: string;
  textPreview: string;
  user: UserForDisplay;
  date: string;
  toNavigate?: (id: string) => void;
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
  const currentUser = useSelector(selectCurrentUser);

  const [isEdit, setIsEdit] = useState(false);
  const [newImage, setNewImage] = useState(image);
  const [newHeadline, setNewHeadline] = useState(headline);
  const [newText, setNewText] = useState(textPreview);

  const edition = () => {
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
