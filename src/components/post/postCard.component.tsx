import React, { FC } from "react";

import "./postCard.styles.scss";
import { User } from "../../utils/types";

type PostCardProps = {
  id: number;
  image: string;
  headline: string;
  textPreview: string;
  user: User;
  date: Date;
  toNavigate: (id: number) => void;
};

const PostCard: FC<PostCardProps> = ({
  toNavigate,
  id,
  image,
  date,
  user,
  headline,
  textPreview,
}) => {
  return (
    <div className={"postCard-container"} onClick={(e) => toNavigate(id)}>
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
