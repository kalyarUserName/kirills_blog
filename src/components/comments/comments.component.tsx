import React, { FC, useState } from "react";

import "./comments.styles.scss";

import CommentComponent from "../comment/comment.component";
import MessageSendBox from "../messageSendBox/messageSendBox.component";

import { Comment } from "../../store/blogs/blogs.types";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";

export type CommentsProps = {
  comments: Comment[] | undefined;
  onSendComment: (message: string) => void;
  currentUser: UserForDisplay | null;
  onSaveComment: (idComment: string, textComment: string) => void;
};

const Comments: FC<CommentsProps> = ({
  comments,
  onSendComment,
  currentUser,
  onSaveComment,
}) => {
  const [newCommentText, setNewCommentText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const onTextChange = (message: string) => {
    setNewCommentText(message);
  };

  const onSendingComment = async (message: string) => {
    setIsProcessing(true);
    await onSendComment(message);
    await setNewCommentText("");
    setIsProcessing(false);
  };

  const onSavingComment = (idComment: string, newText: string) => {
    const savingComment = comments?.find((comment) => comment.id === idComment);
    if (!savingComment || savingComment.text === newText) return;
    onSaveComment(idComment, newText);
  };

  const onDeletingComment = (idComment: string) => {};

  return (
    <div className="comments-container">
      <div className="body">
        <h2>Comments:</h2>
        {comments &&
          comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              id={comment.id}
              user={comment.user}
              date={comment.date.slice(0, 10)}
              text={comment.text}
              className={"box"}
              currentUser={currentUser}
              onSaveComment={onSavingComment}
            />
          ))}
      </div>
      <div className="add-comment">
        <h2>Leave your comment</h2>
        <MessageSendBox
          onTextChange={onTextChange}
          onSendMessage={onSendingComment}
          textMessage={newCommentText}
          isLoading={isProcessing}
        />
      </div>
    </div>
  );
};

export default Comments;
