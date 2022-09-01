import React, { FC, Fragment, useContext, useEffect, useState } from "react";

import "./deleteButton.styles.scss";

import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ModalContext } from "../../context/modal.context";

export type DeleteButtonProps = {
  onDeleteClick: () => void;
};

const DeleteButton: FC<DeleteButtonProps> = ({ onDeleteClick }) => {
  const { isModalOpen, isConfirm, setModalOpen, setText, setConfirm } =
    useContext(ModalContext);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected && isModalOpen) setText("delete");
    if (isSelected && isConfirm) {
      onDeleteClick();
      setConfirm(false);
      setIsSelected(false);
    }
  }, [
    isConfirm,
    isModalOpen,
    isSelected,
    setConfirm,
    setIsSelected,
    onDeleteClick,
    setText,
  ]);

  return (
    <Fragment>
      <div>
        <div
          className="button"
          onClick={() => {
            setIsSelected(true);
            setModalOpen(true);
          }}
        >
          <Delete />
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteButton;
