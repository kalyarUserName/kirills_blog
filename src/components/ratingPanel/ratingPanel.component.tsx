import React, { FC } from "react";

import "./ratingPanel.styles.scss";

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
      {/*<ArrowUp onArrowClick={onArrowUpClick} />*/}
      <div className={"arrow-container"} onClick={onArrowUpClick}>
        <div className={"arrow up"} />
      </div>
      <h3>{count < 1000 ? count : `${(count / 1000).toFixed(1)}k`}</h3>
      <div className={"arrow-container"} onClick={onArrowDownClick}>
        <div className={"arrow down"} />
      </div>
      {/*<ArrowDown onArrowClick={onArrowDownClick} />*/}
    </div>
  );
};

export default RatingPanel;
