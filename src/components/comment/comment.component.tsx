import { FC, useEffect, useState } from "react";

import "./comment.styles.scss";

import UserBar from "../userBar/userBar.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import EditButton from "../editButton/editButton.component";
import EditComment from "../editComment/editComment.component";

export type CommentProps = {
  id: string;
  text: string;
  date: string;
  user: UserForDisplay;
  className?: string;
  onSaveComment: (idComment: string, text: string) => void;
  currentUser: UserForDisplay | null;
};

const Comment: FC<CommentProps> = ({
  id,
  text,
  user,
  date,
  className,
  onSaveComment,
  currentUser,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(text);

  useEffect(() => {
    setNewText(text);
  }, [text]);

  const edition = () => {
    if (isEdit) {
      onSaveComment(id, newText);
    }
    setIsEdit(!isEdit);
  };
  return (
    <div className={`${className}`}>
      <EditButton
        isEdit={isEdit}
        currentUser={currentUser}
        user={user}
        onClick={edition}
      />
      {isEdit ? (
        <EditComment
          onChangeText={setNewText}
          id={id}
          text={newText}
          date={date}
          user={user}
          onSaveComment={onSaveComment}
          currentUser={currentUser}
        />
      ) : (
        <UserBar
          name={user.displayName}
          image={user.imageUrl}
          text={newText}
          date={date}
        />
      )}
    </div>
  );
};

export default Comment;
