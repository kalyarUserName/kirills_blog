import { FC } from "react";

import "./userBar.styles.scss";

type UserBarProps = {
  image: string;
  name: string;
  date: Date;
};
const UserBar: FC<UserBarProps> = ({ image, name, date }) => {
  return (
    <div className={"userBar-container"}>
      <div className={"image-container"}>
        <img className={"image"} src={image} alt={"avatar"} />
      </div>
      <div className={"user"}>
        <h3 className={"name"}>{name}</h3>
        <br />
        <h4 className={"date"}>
          {date.getUTCMonth()}/{date.getDay()}/{date.getFullYear()}
        </h4>
      </div>
    </div>
  );
};

export default UserBar;
