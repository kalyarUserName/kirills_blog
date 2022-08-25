import React, { FC } from "react";

import "./editComment.styles.scss";

import { CommentProps } from "../comment/comment.component";

export type EditCommentProps = {
  onChangeText: (text: string) => void;
} & CommentProps;

const EditComment: FC<EditCommentProps> = ({ text, onChangeText }) => {
  return (
    <div className="edit-comment-container">
      <textarea
        onChange={(event) => onChangeText(event.target.value)}
        value={text}
        placeholder="Enter your comment"
      />
    </div>
  );
};

export default EditComment;
