import React, { useState } from "react";
import { IoChatboxEllipses, IoSend } from "react-icons/io5";

import { ChatBoxContainer } from "./chatBox.style";
import { colors } from "../config";

const ChatBox = (props) => {
  const { messages } = props;
  const [textMsg, setTextMsg] = useState("");

  const onType = (e) => {
    setTextMsg(e.target.value);
  };

  const sendMsg = () => {
    setTextMsg("");
    if (textMsg !== "") {
      props.sendMessage(textMsg);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTextMsg("");
      if (textMsg !== "") {
        props.sendMessage(textMsg);
      }
    }
  };

  return (
    <ChatBoxContainer colors={colors}>
      <div className="header">
        <div className="headerLogo">
          <IoChatboxEllipses style={{ fontSize: 20 }} color="white" />
        </div>
        <div className="headerTitle">پیام ها</div>
      </div>
      <div className="chatBox">
        <div className="inputBox">
          {!props.disableChat && (
            <div onClick={sendMsg} className="sendBtn">
              <IoSend style={{ fontSize: 20 }} color="white" />
            </div>
          )}
          {!props.disableChat && (
            <div className="inputContainer">
              <input
                value={textMsg}
                onChange={(e) => onType(e)}
                className="input"
                placeholder="پیام خود را وارد کنید"
                disabled={props.disableChat}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          {props.disableChat && (
            <div className="disabled">
              <div>چت غیرفعال می‌باشد</div>
            </div>
          )}
        </div>
        <div className="messagesBox">
          {messages.map((it, index) => {
            var startTimeISOString = it.time;
            var startTime = new Date(startTimeISOString);
            return (
              <div className="message" key={it.messageID}>
                <div className="name">{it.fullName}</div>
                <div className="text">{it.text}</div>
                <div className="time">
                  {startTime.getHours()}:{startTime.getMinutes()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ChatBoxContainer>
  );
};

export default ChatBox;
