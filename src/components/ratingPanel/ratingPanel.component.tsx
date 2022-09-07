import React, { FC } from "react";

import "./ratingPanel.styles.scss";
import ArrowUp from "../arrowButtons/arrowUp.component";
import ArrowDown from "../arrowButtons/arrowDown.component";

export type ArrowClick = () => void;

export type RatingPanelProps = {
  onArrowUpClick: ArrowClick;
  onArrowDownClick: ArrowClick;
  count: number;
};

const RatingPanel: FC<RatingPanelProps> = ({
  onArrowDownClick,
  onArrowUpClick,
  count,
}) => {
  return (
    <div className={"rating-panel"}>
      <ArrowUp onArrowClick={onArrowUpClick} />
      <h3>{count}</h3>
      <ArrowDown onArrowClick={onArrowDownClick} />
    </div>
  );
};

export default RatingPanel;
