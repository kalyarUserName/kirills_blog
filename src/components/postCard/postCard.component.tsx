import React, { FC } from "react";

import "./postCard.styles.scss";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";

type PostCardProps = {
  id: string;
  image: string;
  headline: string;
  textPreview: string;
  user?: UserForDisplay;
  date?: string;
  toNavigate: (id: string) => void;
};

const PostCard: FC<PostCardProps> = ({
  toNavigate,
  id,
  image,
  headline,
  textPreview,
}) => {
  return (
    <div className={"postCard-container"} onClick={() => toNavigate(id)}>
      <div className={"image-container"}>
        <img src={image} alt={headline} />
      </div>
      <div className={"post-container"}>
        <h2>{headline}</h2>
        <p>{textPreview}</p>
      </div>
    </div>
  );
};

export default PostCard;
