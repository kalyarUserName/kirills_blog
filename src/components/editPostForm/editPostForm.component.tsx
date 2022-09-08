import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";

import "./editPostForm.styles.scss";
import { createReferenceToImageForPost } from "../../utils/firebase/firebase.utils";
import FormInput from "../formInput/formInput.component";
import { BlogItem } from "../../store/blogs/blogs.types";

type EditPostFormProps = {
  post: BlogItem;
  onChangeImages: (imagesSrc: string[]) => void;
  onChangeHeadline: (headline: string) => void;
  onChangeText: (text: string) => void;
};

const EditPostForm: FC<EditPostFormProps> = ({
  post,
  onChangeImages,
  onChangeHeadline,
  onChangeText,
}) => {
  const { id, text, headline, imagesUrl, user } = post;

  const [newImages, setNewImages] = useState(imagesUrl);
  const [imageIndex, setImageIndex] = useState(-1);

  useEffect(() => {
    if (newImages.length !== 0 && (newImages[0] !== "" || imageIndex !== -1)) {
      onChangeImages(newImages);
      if (imageIndex !== -1) setImageIndex(-1);
    }
  }, [newImages, imageIndex, onChangeImages]);

  const addImage = (event: ChangeEvent<HTMLInputElement>, index?: number) => {
    if (event.target.files && event.target.files[0]) {
      createReferenceToImageForPost(
        event.target.files[0],
        user.email,
        setNewImages,
        newImages,
        id,
        index
      );
      if (index) setImageIndex(index);
    }
  };

  return (
    <div className="edit-post-container">
      <div className="image-container">
        {newImages.length !== 0 && newImages[0] !== "" ? (
          newImages.map((image, index) => (
            <Fragment key={index}>
              <FormInput
                className={`image`}
                label={`Select image №${index + 1}`}
                type="file"
                id="uploadImage"
                placeholder="Select image for post..."
                onChange={(event) => addImage(event, index)}
              />
              <img src={image} alt="post" />
            </Fragment>
          ))
        ) : (
          <img src={"/images/blank/blankPhoto1.png"} alt="post" />
        )}
        <FormInput
          className={`image`}
          label={`Select image №${imagesUrl.length + 1}`}
          type="file"
          id="uploadImage"
          placeholder="Select image for post..."
          onChange={(event) => addImage(event)}
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
