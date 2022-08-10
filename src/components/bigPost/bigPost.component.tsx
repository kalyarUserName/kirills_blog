import { FC, useEffect, useState } from "react";

import "./bigPost.styles.scss";

import UserBar from "../userBar/userBar.component";
import EditButton from "../editButton/editButton.component";
import { User, Users } from "../../utils/types";

type NewestPostProps = {
  id: number;
  image: string;
  headline: string;
  textPreview: string;
  user: User;
  date: string;
  toNavigate?: (id: number) => void;
};

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

  useEffect(() => {
    setEditionElemSize();
  }, [isEdit]);

  const setEditionElemSize = () => {
    const imageElem = document.getElementById("image");
    const headlineElem = document.getElementById("headline");
    const textElem = document.getElementById("text");

    const imageEditElem = document.getElementById("uploadImage");
    const headlineEditElem = document.getElementById("headline");
    const textEditElem = document.getElementById("text");

    let imageSize;
    let headlineSize;
    let textSize;

    if (imageElem)
      imageSize = {
        width: imageElem.clientWidth,
        height: imageElem.clientHeight,
      };
    else {
      imageSize = {
        width: 500,
        height: 650,
      };
    }
    if (headlineElem) {
      headlineSize = {
        width: headlineElem.clientWidth,
        height: headlineElem.clientHeight,
      };
    } else {
      headlineSize = {
        width: 700,
        height: 50,
      };
    }
    if (textElem) {
      textSize = {
        width: textElem.clientWidth,
        height: textElem.clientHeight,
      };
    } else {
      textSize = {
        width: 700,
        height: 150,
      };
    }

    if (imageEditElem) {
      imageEditElem.style.width = `${imageSize.width}px`;
      imageEditElem.style.height = `${imageSize.height}px`;
    }
    if (headlineEditElem) {
      headlineEditElem.style.width = `${headlineSize.width}px`;
      headlineEditElem.style.height = `${headlineSize.height}px`;
    }
    if (textEditElem) {
      textEditElem.style.width = `${textSize.width}px`;
      textEditElem.style.height = `${textSize.height}px`;
    }
  };

  const edition = () => {
    setIsEdit(!isEdit);
    // if (isEdit) setEditionElemSize();
  };

  return (
    <div className="newestPost-container">
      <div className="image" onClick={() => (toNavigate ? toNavigate(id) : {})}>
        {!isEdit ? (
          <img src={newImage} alt={headline} id="image" />
        ) : (
          <input
            type="file"
            id="uploadImage"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setNewImage(URL.createObjectURL(event.target.files[0]));
              }
            }}
          />
        )}
      </div>
      <div className="post-container">
        {JSON.stringify(currentUser) === JSON.stringify(user) && (
          <div className="edit-button" onClick={() => edition()}>
            <EditButton />
          </div>
        )}
        {!isEdit ? (
          <h2 id="headline" onClick={() => (toNavigate ? toNavigate(id) : {})}>
            {headline}
          </h2>
        ) : (
          <input
            type="text"
            value={newHeadline}
            onChange={(event) => {
              setNewHeadline(event.target.value);
            }}
          />
        )}
        {!isEdit ? (
          <p id="text">{textPreview}</p>
        ) : (
          <textarea
            id="textEdit"
            value={newText}
            onChange={(event) => {
              setNewText(event.target.value);
            }}
          />
        )}
        <div className="userbar">
          <UserBar image={user.image} name={user.name} date={date} />
        </div>
      </div>
    </div>
  );
};

export default BigPost;
