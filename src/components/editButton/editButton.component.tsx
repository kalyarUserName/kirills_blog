import React, { FC, Fragment } from "react";

import "./editButton.styles.scss";

import { ReactComponent as Edit } from "../../assets/edit.svg";

export type EditButtonProps = {
  onEditClick: () => void;
};

const EditButton: FC<EditButtonProps> = ({ onEditClick }) => {
  return (
    <Fragment>
      <div className="edit-button" onClick={() => onEditClick()}>
        <div className="button">
          <Edit />
        </div>
      </div>
    </Fragment>
  );
};

export default EditButton;
