import { ChangeEvent, FC, useEffect, useState } from "react";

import "./editPostForm.styles.scss";
import {
  createReferenceToImage,
  TypeOfImage,
  UserForDisplay,
} from "../../utils/firebase/firebase.utils";

type EditPostFormProps = {
  text: string;
  headline: string;
  image?: string;
  onChangeImage: (imageSrc: string) => void;
  onChangeHeadline: (headline: string) => void;
  onChangeText: (text: string) => void;
  user: UserForDisplay;
  id: string;
};

const EditPostForm: FC<EditPostFormProps> = ({
  text,
  headline,
  image,
  onChangeImage,
  onChangeHeadline,
  onChangeText,
  user,
  id,
}) => {
  const [newImage, setNewImage] = useState(image);

  useEffect(() => {
    if (newImage && newImage !== "") onChangeImage(newImage);
  }, [newImage]);

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      createReferenceToImage(
        event.target.files[0],
        user.email,
        TypeOfImage.postImage,
        setNewImage,
        id
      );
    }
  };

  return (
    <div className="edit-post-container">
      <div className="image-container">
        <input
          className={`image`}
          type="file"
          id="uploadImage"
          placeholder="Select image for post..."
          onChange={(event) => addImage(event)}
        />
        {newImage && newImage !== "" ? (
          <img src={newImage} alt="Image for post" />
        ) : (
          <img src={"/images/blank/blankPhoto1.png"} alt="Image for post" />
        )}
      </div>
      <div className="post-container">
        <div className="headline">
          <textarea
            placeholder="Enter headline of post..."
            id="headlineEdit"
            value={headline}
            onChange={(event) => {
              onChangeHeadline(event.target.value);
            }}
          />
        </div>
        <div className="text">
          <textarea
            placeholder="Enter text of post..."
            id="textEdit"
            value={text}
            onChange={(event) => {
              onChangeText(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
