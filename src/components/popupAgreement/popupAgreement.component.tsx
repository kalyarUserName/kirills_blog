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
    let postListElement = document.getElementById("post-list");
    if (postListElement) postListElement.style.pointerEvents = "false";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <div className={"modal"}>
      {/*<div className={"modal"} onClick={() => closePopup()}>*/}
      <div className={"modal-container"}>
        <div className={"modal-header"}>
          <h3>{text}</h3>
        </div>
        <div className={"button-container"} onClick={() => {}}>
          <div className={"cancel-button"}>
            <Button
              // className={"cancel-button"}
              onClick={() => closePopup()}
              text={"Cancel"}
            />
          </div>
          <div className={"agree-button"}>
            <Button
              // className={"agree-button"}
              onClick={() => confirm()}
              text={"Confirm"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupAgreement;
