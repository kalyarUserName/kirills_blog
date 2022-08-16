import { FC } from "react";

import "./comment.styles.scss";

import UserBar from "../userBar/userBar.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";

type CommentProps = {
  text: string;
  date: string;
  user: UserForDisplay;
  className: string;
};

const Comment: FC<CommentProps> = ({ text, user, date, className }) => {
  return (
    <div className={`${className}`}>
      <UserBar
        name={user.displayName}
        image={user.imageUrl}
        text={text}
        date={date}
      />
    </div>
  );
};

export default Comment;
