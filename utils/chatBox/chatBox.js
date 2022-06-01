import React, { useState } from "react";
import { IoChatboxEllipses, IoSend } from "react-icons/io5";

import { ChatBoxContainer } from "./chatBox.style";
import { colors } from "../config";
import { GoKebabVertical } from "react-icons/go";
import { Dropdown } from "react-bootstrap";

const ChatBox = (props) => {
  const { messages } = props;
  const [textMsg, setTextMsg] = useState("");
  const Icon = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <GoKebabVertical style={{ position: "relative" }} />
    </a>
  ));
  const onType = (e) => {
    setTextMsg(e.target.value);
  };

  const sendMsg = () => {
    setTextMsg("");
    if (textMsg !== "") {
      props.sendMessage(textMsg);
    }
  };
  const deleteMsg = (id) => {
    props.deleteMessage(id);
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
              <IoSend style={{ fontSize: 20 }} color="#111" />
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
                <div className="name">
                  {it.fullName}

                  {props.role === "TEACHER" && (
                    <Dropdown align="end">
                      <Dropdown.Toggle align="end" as={Icon}></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => deleteMsg(it.messageId)}
                          bsPrefix="dropdownItem"
                        >
                          حذف
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
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
