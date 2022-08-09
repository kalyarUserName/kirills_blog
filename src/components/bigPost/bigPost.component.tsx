import { FC } from "react";
import UserBar from "../userBar/userBar.component";

import "./bigPost.styles.scss";
import { User } from "../../utils/types";

type NewestPostProps = {
  id: number;
  image: string;
  headline: string;
  textPreview: string;
  user: User;
  date: Date;
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
  return (
    <div className="newestPost-container">
      <div
        className="image"
        onClick={(e) => (toNavigate ? toNavigate(id) : {})}
      >
        <img src={image} alt={headline} />
      </div>
      <div className="post-container">
        <h2 onClick={(e) => (toNavigate ? toNavigate(id) : {})}>{headline}</h2>
        <p>{textPreview}</p>
        <div className="userbar">
          <UserBar
            image={user.image}
            name={user.name}
            date={date.toDateString()}
          />
        </div>
      </div>
    </div>
  );
};

export default BigPost;
