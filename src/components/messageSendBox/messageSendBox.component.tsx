import { FC } from "react";

import "./messageSendBox.styles.scss";

type MessageSendBoxProps = {
  onTextChange: (message: string) => void;
  onSendMessage: (message: string) => void;
  textMessage: string;
};

const MessageSendBox: FC<MessageSendBoxProps> = ({
  onTextChange,
  onSendMessage,
  textMessage,
}) => {
  return (
    <div className="messageBox-container">
      <textarea
        placeholder={"Enter your comment..."}
        onChange={(event) => {
          onTextChange(event.target.value);
        }}
        value={textMessage}
      />
      <button onClick={() => onSendMessage(textMessage)}> {"Send"} </button>
    </div>
  );
};

export default MessageSendBox;
