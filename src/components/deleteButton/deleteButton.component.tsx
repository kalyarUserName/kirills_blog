import React, { FC, Fragment, useState } from "react";

import "./deleteButton.styles.scss";

import { ReactComponent as Delete } from "../../assets/delete.svg";
import PopupAgreement from "../popupAgreement/popupAgreement.component";

export type DeleteButtonProps = {
  onDeleteClick: () => void;
};

const DeleteButton: FC<DeleteButtonProps> = ({ onDeleteClick }) => {
  const [popup, setPopup] = useState(false);

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
      <div
        onClick={() => {
          setPopup(true);
        }}
      >
        <div className="button">
          <Delete
            onClick={() => {
              setPopup(true);
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteButton;
