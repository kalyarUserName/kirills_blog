import React, { Fragment, useContext } from "react";
import { ModalContext } from "../../context/modal.context";
import PopupAgreement from "../popupAgreement/popupAgreement.component";

const Modal = () => {
  const { isModalOpen, setConfirm, setModalOpen, modalText } =
    useContext(ModalContext);
  return (
    <Fragment>
      {isModalOpen && (
        <PopupAgreement
          text={modalText}
          closePopup={() => {
            setModalOpen(!isModalOpen);
          }}
          confirm={() => {
            setConfirm(true);
            setModalOpen(!isModalOpen);
          }}
        />
      )}
    </Fragment>
  );
};

export default Modal;
