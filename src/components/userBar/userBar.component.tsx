import { FC } from "react";

import "./userBar.styles.scss";

type UserBarProps = {
  image: string;
  name: string;
  date: string;
  text?: string;
};

const UserBar: FC<UserBarProps> = ({ image, name, date, text }) => {
  return (
    <div className={"userBar-container"}>
      <div className={"image-container"}>
        <img className={"image"} src={image} alt={"avatar"} />
      </div>
      <div className={"user"}>
        <h3 className={"name"}>{name}</h3>
        <h4 className={"text"}>{text}</h4>
        <hr />

        <h4 className={"date"}>{date}</h4>
      </div>
    </div>
  );
};

export default UserBar;
