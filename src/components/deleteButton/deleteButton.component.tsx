import React, { FC, Fragment, useState } from "react";

import "./deleteButton.styles.scss";

import { ReactComponent as Delete } from "../../assets/delete.svg";
import PopupAgreement from "../popupAgreement/popupAgreement.component";

export type DeleteButtonProps = {
  isCurrentUserCreator: boolean;
  onDeleteClick: () => void;
};

let hover = false;

const DeleteButton: FC<DeleteButtonProps> = ({
  isCurrentUserCreator,
  onDeleteClick,
}) => {
  const [hovering, setHovering] = useState(false);
  const [popup, setPopup] = useState(false);
  // const [isConfirm, setIsConfirm] = useState(false);

  const closePopup = () => {
    setPopup(false);
  };

  const onDelete = () => {
    onDeleteClick();
    closePopup();
  };

  return (
    <Fragment>
      {popup && (
        <PopupAgreement
          text={"Are you sure you want to delete?"}
          closePopup={closePopup}
          confirm={onDelete}
        />
      )}
      {isCurrentUserCreator && (
        <div
          className="delete-button"
          onClick={() => {
            setPopup(true);
          }}
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
          {hovering && <div className="hovering-text">{"Delete post"}</div>}
          <div className="button">
            <Delete
              onClick={() => {
                setPopup(true);
              }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DeleteButton;
