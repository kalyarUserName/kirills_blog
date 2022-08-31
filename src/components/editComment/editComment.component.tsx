import React, { FC } from "react";

import "./editComment.styles.scss";

import { Comment } from "../../store/blogs/blogs.types";

export type EditCommentProps = {
  onChangeText: (text: string) => void;
} & Comment;

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
