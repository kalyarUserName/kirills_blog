import { FC, useState } from "react";

import "./editPostForm.styles.scss";

type EditPostFormProps = {
  text: string;
  headline: string;
  image?: string;
  onChangeImage: (imageSrc: string) => void;
  onChangeHeadline: (headline: string) => void;
  onChangeText: (text: string) => void;
};

const EditPostForm: FC<EditPostFormProps> = ({
  text,
  headline,
  image,
  onChangeImage,
  onChangeHeadline,
  onChangeText,
}) => {
  const [newImage, setNewImage] = useState(image);

  return (
    <div className="edit-post-container">
      <div className="image-container">
        <input
          className={`image`}
          type="file"
          id="uploadImage"
          placeholder="Select image for post..."
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              const imageT = URL.createObjectURL(event.target.files[0]);
              onChangeImage(imageT);
              setNewImage(imageT);
            }
          }}
        />
        <img
          src={newImage !== "" ? "/images/blank/blankPhoto1.png" : newImage}
          alt="Image for post"
        />
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
