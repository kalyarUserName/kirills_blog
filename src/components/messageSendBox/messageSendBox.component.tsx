import { FC } from "react";

import "./messageSendBox.styles.scss";
import Button from "../button/button.component";

type MessageSendBoxProps = {
  onTextChange: (message: string) => void;
  onSendMessage: (message: string) => void;
  textMessage: string;
  isLoading?: boolean;
};

const MessageSendBox: FC<MessageSendBoxProps> = ({
  onTextChange,
  onSendMessage,
  textMessage,
  isLoading,
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
      <Button
        onClick={() => onSendMessage(textMessage)}
        isLoading={isLoading}
        text={"Send"}
      />
    </div>
  );
};

export default MessageSendBox;
