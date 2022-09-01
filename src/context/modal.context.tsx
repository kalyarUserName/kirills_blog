import React, { createContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
  isConfirm: false,
  modalText: "",
  setModalOpen: (_bool: boolean) => {},
  setConfirm: (_bool: boolean) => {},
  setText: (_text: string) => {},
});

export const ModalProvider = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [modalText, setModalText] = useState("");

  const setConfirm = (bool: boolean) => {
    setIsConfirm(bool);
  };

  const setModalOpen = (bool: boolean) => {
    setIsModalOpen(bool);
  };

  const setText = (text: string) => {
    setModalText(text);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isConfirm,
        modalText,
        setModalOpen,
        setConfirm,
        setText,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
