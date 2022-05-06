import styled from "styled-components";

export const ChatBoxContainer = styled.div`
  background-color: ${(props) => props.colors.main};
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 4px;

  .header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    height: 8%;
  }

  .headerTitle {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
  }

  .chatBox {
    direction: rtl;
    background-color: #5b5b5b;
    height: 92%;
    border-radius: 4px;
    margin: 0;
    display: flex;
    flex-direction: column-reverse;
  }

  .inputBox {
    height: 50px;
    width: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    flex-direction: row-reverse;
    padding: 4px;
  }

  .sendBtn {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(180deg);
  }

  .sendBtn:hover {
    cursor: pointer;
  }

  .inputContainer {
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input {
    width: 100%;
    height: 100%;
    background-color: inherit;
    border: 0;
    padding-right: 8px;
    color: #fff;
  }

  .input:focus {
    outline: none;
  }

  .messagesBox {
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    padding: 8px;
    overflow: scroll;
    overflow-x: hidden;
  }

  .messagesBox::-webkit-scrollbar {
    width: 10px;
  }

  .messagesBox::-webkit-scrollbar-thumb {
    background: ${(props) => props.colors.second};
    border-radius: 4px;
  }

  .message {
    background-color: #999;
    margin-bottom: 6px;
    border-radius: 12px;
    border-bottom-right-radius: 2px;
    padding: 6px 12px;
    color: #eee;
  }

  .name {
    font-weight: bold;
    font-size: 13px;
  }

  .text {
    word-break: break-word;
    font-size: 14px;
  }

  .time {
    font-size: 12px;
    text-align: left;
  }

  .disabled {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    align-self: center;
    text-align: center;
  }
`;
