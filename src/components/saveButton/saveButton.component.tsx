import React, { FC } from "react";

import "./saveButton.styles.scss";

import { ReactComponent as Save } from "../../assets/save.svg";

export type SaveButtonProps = {
  onSaveClick: () => void;
};

const EditButton: FC<SaveButtonProps> = ({ onSaveClick }) => {
  return (
    <div className="save-button" onClick={() => onSaveClick()}>
      <div className="button">
        <Save viewBox="0 0 95 95" />
      </div>
    </div>
  );
};

export default EditButton;
