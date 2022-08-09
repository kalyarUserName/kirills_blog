import React from "react";
import { Users } from "../../utils/types";
import Comment from "../comment/comment.component";

const dataComments = [
  {
    user: Users[4],
    text: "nice, so delicious eqweqw eqweqsad ae qwd qwadas d qwe qqawda sd aseawe aw asdawd adasd qwqwdqwdsaddqwd qwwdqwdw",
    date: "2022-02-02",
  },
  {
    user: Users[3],
    text: "did you make this yourself?",
    date: "2022-02-03",
  },
  {
    user: Users[0],
    text: "Yes! it was hard",
    date: "2022-02-03",
  },
];

const Comments = () => {
  return (
    <div>
      {dataComments.map((comment, index) => (
        <Comment
          key={index}
          user={comment.user}
          date={comment.date}
          text={comment.text}
        />
      ))}
    </div>
  );
};

export default Comments;
