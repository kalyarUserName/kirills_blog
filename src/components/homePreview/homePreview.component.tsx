import React from "react";
import UserBar from "../userBar/userBar.component";

const HomePreview = () => {
  return (
    <div className="preview-container">
      <div className="image"></div>
      <div className="post-container">
        <h2>Headlinedqwdqwdqw qwd qwd qwd wq dqwdasd</h2>
        <p>
          eqweqweqweqwewqeqweqdasd eqw eqw eqwe wqeqwdqsadas d wqe wqe asd asd
          awd awd awd awd awd awd asd asd
        </p>
      </div>
      <UserBar
        image={"/images/ava_men_1.jpg"}
        name={"John"}
        date={new Date()}
      />
    </div>
  );
};

export default HomePreview;
