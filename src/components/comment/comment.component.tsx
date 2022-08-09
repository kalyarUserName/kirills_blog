import { FC } from "react";
import { User } from "../../utils/types";
import UserBar from "../userBar/userBar.component";

type CommentProps = {
  text: string;
  date: string;
  user: User;
};

const Comment: FC<CommentProps> = ({ text, user, date }) => {
  return (
    <div>
      <hr />
      <UserBar name={user.name} image={user.image} text={text} date={date} />
    </div>
  );
};

export default Comment;
