import React, { FC } from "react";

import { ReactComponent as Arrow } from "../../assets/arrow_up.svg";
import { ArrowClick } from "../ratingPanel/ratingPanel.component";

export type ArrowProps = {
  onArrowClick: ArrowClick;
};
const ArrowUp: FC<ArrowProps> = ({ onArrowClick }) => {
  return (
    <div className={"arrow-container"}>
      <Arrow onClick={onArrowClick} />
    </div>
  );
};

export default ArrowUp;
