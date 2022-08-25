import React, { FC, Fragment, useState } from "react";

import "./editButton.styles.scss";

import { ReactComponent as Edit } from "../../assets/edit.svg";
import { UserForDisplay } from "../../utils/firebase/firebase.utils";

export type EditButtonProps = {
  currentUser: UserForDisplay | null;
  user: UserForDisplay;
  onClick: () => void;
  isEdit: boolean;
};

let hover = false;

const EditButton: FC<EditButtonProps> = ({
  isEdit,
  user,
  currentUser,
  onClick,
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <Fragment>
      {currentUser && currentUser.email === user.email && (
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
          <Edit />
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
