import { FC } from "react";
import { User } from "../../utils/types";

import "./comment.styles.scss";

import UserBar from "../userBar/userBar.component";

type CommentProps = {
  text: string;
  date: string;
  user: User;
  className: string;
};

const Comment: FC<CommentProps> = ({ text, user, date, className }) => {
  return (
    <div className={`${className}`}>
      <UserBar name={user.name} image={user.image} text={text} date={date} />
    </div>
  );
};

export default Comment;
