import React, { FC } from "react";

import "./eye.styles.scss";

import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeClosed } from "../../assets/eye_close.svg";

export type EyeProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MyComponent: FC<EyeProps> = ({ isOpen, onClick }) => {
  return (
    <div className={"eye-container"} onClick={onClick}>
      {isOpen ? <Eye viewBox="0 0 50 50" /> : <EyeClosed viewBox="0 0 50 50" />}
    </div>
  );
};

export default MyComponent;
