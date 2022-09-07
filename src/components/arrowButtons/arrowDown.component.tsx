import React, { FC } from "react";

import "./arrowButtons.styles.scss";

import { ArrowProps } from "./arrowUp.component";
import { ReactComponent as Arrow } from "../../assets/arrow_down.svg";

const ArrowDown: FC<ArrowProps> = ({ onArrowClick }) => {
  return (
    <div className={"arrow-container"}>
      <Arrow onClick={onArrowClick} />
    </div>
  );
};

export default ArrowDown;
