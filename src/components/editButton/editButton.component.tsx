import React, { FC, Fragment, useState } from "react";

import "./editButton.styles.scss";

import { ReactComponent as Edit } from "../../assets/edit.svg";

export type EditButtonProps = {
  isCurrentUserCreator: boolean;
  onClick: () => void;
  isEdit: boolean;
};

let hover = false;

const EditButton: FC<EditButtonProps> = ({
  isEdit,
  isCurrentUserCreator,
  onClick,
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <Fragment>
      {isCurrentUserCreator && (
        <div
          className="edit-button"
          onClick={() => onClick()}
          onMouseOver={() => {
            hover = true;
            setTimeout(() => {
              if (hover) {
                setHovering(true);
              }
            }, 100);
          }}
          onMouseLeave={() => {
            hover = false;
            setHovering(false);
          }}
        >
          <div className="button">
            <Edit />
          </div>
          {hovering && (
            <div className="hovering-text">
              {!isEdit ? "Editing post" : "Save post"}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default EditButton;
