import { FC } from "react";

import "./messageSendBox.styles.scss";

type MessageSendBoxProps = {
  onTextChange: (message: string) => void;
  onSendMessage: () => void;
};
const MessageSendBox: FC<MessageSendBoxProps> = ({
  onTextChange,
  onSendMessage,
}) => {
  return (
    <div className="messageBox-container">
      <textarea
        placeholder={"Enter your comment..."}
        onChange={(event) => {
          onTextChange(event.target.value);
        }}
      />
      <button onClick={() => onSendMessage()}>Send</button>
    </div>
  );
};

export default MessageSendBox;
