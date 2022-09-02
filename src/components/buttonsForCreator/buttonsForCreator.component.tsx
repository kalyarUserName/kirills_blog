import React, { FC, useState } from "react";

import "./buttonsForCreator.styles.scss";

import DeleteButton, {
  DeleteButtonProps,
} from "../deleteButton/deleteButton.component";
import EditButton, {
  EditButtonProps,
} from "../editButton/editButton.component";

export type ButtonsForCreatorProps = {
  isDelete?: boolean;
  isEditing?: boolean;
} & DeleteButtonProps &
  EditButtonProps;

let hover = false;

const ButtonsForCreator: FC<ButtonsForCreatorProps> = ({
  onEditClick,
  onDeleteClick,
  isDelete = false,
  isEditing = false,
}) => {
  const [hovering, setHovering] = useState(false);
  const [hoveringText, setHoveringText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const onMouseHover = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    hover = true;
    setTimeout(() => {
      if (hover) {
        setHovering(true);
      }
    }, 100);
  };
  const onMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    hover = false;
    setHovering(false);
  };

  const onDeleting = () => {
    onDeleteClick();
  };

  const EditClick = () => {
    onEditClick();
    setIsEdit(!isEdit);
  };
  return (
    <div className={"buttons-container"}>
      {isEditing ? (
        <div
          className="edit-button"
          onMouseOver={(event) => {
            onMouseHover(event);
            isEdit ? setHoveringText("Save") : setHoveringText("Edit");
          }}
          onMouseLeave={(event) => {
            onMouseLeave(event);
            setHoveringText("");
          }}
        >
          <EditButton onEditClick={EditClick} />
        </div>
      ) : (
        <div></div>
      )}
      {hovering ? (
        <div
          className={`hovering-text ${
            hoveringText !== "Delete" ? "" : "isDelete"
          }`}
        >
          {hoveringText}
        </div>
      ) : (
        <div />
      )}
      {isDelete ? (
        <div
          className="delete-button"
          onMouseOver={(event) => {
            onMouseHover(event);
            setHoveringText("Delete");
          }}
          onMouseLeave={(event) => {
            onMouseLeave(event);
            setHoveringText("");
          }}
          onClick={() => {
            document.body.style.overflowY = "hidden";
          }}
        >
          <DeleteButton onDeleteClick={onDeleting} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ButtonsForCreator;
