import { FC, useEffect, useMemo, useState } from "react";

import "./comment.styles.scss";

import UserBar from "../userBar/userBar.component";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";
import EditComment from "../editComment/editComment.component";
import ButtonsForCreator from "../buttonsForCreator/buttonsForCreator.component";

export type CommentProps = {
  id: string;
  text: string;
  date: string;
  user: UserForDisplay;
  currentUser: UserForDisplay | null;
  onSaveComment: (idComment: string, text: string) => void;
  onDeleteComment: (idComment: string) => void;
  className?: string;
};

const Comment: FC<CommentProps> = ({
  id,
  text,
  user,
  date,
  className,
  currentUser,
  onSaveComment,
  onDeleteComment,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(text);

  useEffect(() => {
    setNewText(text);
  }, [text]);

  const isCurUserCreator = useMemo(
    () => currentUser !== null && currentUser.email === user.email,
    [currentUser, user]
  );

  const edition = () => {
    if (isEdit) {
      onSaveComment(id, newText);
    }
    setIsEdit(!isEdit);
  };

  const deletion = () => {
    onDeleteComment(id);
  };

  return (
    <div className={`${className}`}>
      {isCurUserCreator && (
        <ButtonsForCreator
          onDeleteClick={deletion}
          onEditClick={edition}
          isDelete={true}
          isEditing={true}
        />
      )}
      {isEdit ? (
        <EditComment
          onChangeText={setNewText}
          id={id}
          text={newText}
          date={date}
          user={user}
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
