import React, { FC, useEffect } from "react";

import "./popupAgreement.styles.scss";

import Button from "../button/button.component";

export type PopupAgreementProps = {
  text: string;
  closePopup: () => void;
  confirm: () => void;
};

const PopupAgreement: FC<PopupAgreementProps> = ({
  text,
  closePopup,
  confirm,
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <div className={"modal"}>
      <div className={"modal-container"}>
        <div className={"modal-header"}>
          <h3>Are you sure you want to {text}?</h3>
        </div>
        <div className={"button-container"} onClick={() => {}}>
          <div className={"cancel-button"}>
            <Button onClick={() => closePopup()} text={"Cancel"} />
          </div>
          <div className={"agree-button"}>
            <Button onClick={() => confirm()} text={"Confirm"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAgreement;
