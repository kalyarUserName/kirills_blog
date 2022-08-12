import React, { useEffect, useState } from "react";
import { User, Users } from "../../utils/types";
import Comment from "../comment/comment.component";

import "./comments.styles.scss";
import MessageSendBox from "../messageSendBox/messageSendBox.component";
import { dateToString } from "../../utils/general";

export type Comment = {
  user: User;
  text: string;
  date: string;
};

const dataComments = [
  {
    user: Users[4],
    text: "nice, so delicious eqweqw eqweqsad ae qwd qwadas d qwe qqawda sd aseawe aw asdawd adasd qwqwdqwdsaddqwd qwwdqwdw",
    date: "02-02-2022",
  },
  {
    user: Users[3],
    text: "did you make this yourself?",
    date: "02-03-2022",
  },
  {
    user: Users[0],
    text: "Yes! it was hard",
    date: "02-03-2022",
  },
  {
    user: Users[3],
    text: "With experience comes wisdom. We’ve developed a method to streamline our clients’ mobile and web apps ideas, which we proudly call the “Mathison Methodology”, focusing on simplicity, communication, feedback, respect, and courage. ‘“First in class”’ not only translates to being the best in the industry, but also illustrates our ability to be a reliable strategic business partner.",
    date: "02-04-2022",
  },
];

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  const currentUser = Users[0]; //mock current user

  useEffect(() => {
    setComments(dataComments);
  }, []);

  const onTextChange = (message: string) => {
    setNewCommentText(message);
  };

  const onSendMessage = () => {
    const dateT = new Date();
    const newComment: Comment = {
      user: currentUser,
      date: dateToString(dateT),
      text: newCommentText,
    };
    setComments([newComment, ...comments]);
  };
  return (
    <div className="comments-container">
      <div className="body">
        <h2>Comments:</h2>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            user={comment.user}
            date={comment.date}
            text={comment.text}
            className={"box"}
          />
        ))}
      </div>
      <div className="add-comment">
        <h2>Leave your comment</h2>
        <MessageSendBox
          onTextChange={onTextChange}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
};

export default Comments;
