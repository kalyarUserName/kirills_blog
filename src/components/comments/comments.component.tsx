import React, { FC, useState } from "react";

import "./comments.styles.scss";

import CommentComponent from "../comment/comment.component";
import MessageSendBox from "../messageSendBox/messageSendBox.component";

import { Comment } from "../../store/blogs/blogs.types";

export type CommentsProps = {
  comments: Comment[] | undefined;
  onSendComment: (message: string) => void;
};

const Comments: FC<CommentsProps> = ({ comments, onSendComment }) => {
  const [newCommentText, setNewCommentText] = useState("");

  const onTextChange = (message: string) => {
    setNewCommentText(message);
  };

  const onSendingComment = async (message: string) => {
    await onSendComment(message);
    await setNewCommentText("");
  };

  return (
    <div className="comments-container">
      <div className="body">
        <h2>Comments:</h2>
        {comments &&
          comments.map((comment, index) => (
            <CommentComponent
              key={index}
              user={comment.user}
              date={comment.date.slice(0, 10)}
              text={comment.text}
              className={"box"}
            />
          ))}
      </div>
      <div className="add-comment">
        <h2>Leave your comment</h2>
        <MessageSendBox
          onTextChange={onTextChange}
          onSendMessage={onSendingComment}
          textMessage={newCommentText}
        />
      </div>
    </div>
  );
};

export default Comments;
