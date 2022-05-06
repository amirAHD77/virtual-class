import styled from "styled-components";

export const OnlineUsersContainer = styled.div`
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

  .namesBox {
    direction: rtl;
    flex: 1;
    background-color: #5b5b5b;
    height: 92%;
    border-radius: 4px;
    padding: 16px;
    overflow: scroll;
    overflow-x: hidden;
  }

  .nameContainer {
    text-align: right;
    display: flex;
    flex-direction: row;
  }

  .namesBox::-webkit-scrollbar {
    width: 10px;
  }

  .namesBox::-webkit-scrollbar-thumb {
    background: ${(props) => props.colors.second};
    border-radius: 4px;
  }

  .name {
    color: #fff;
    margin-right: 8px;
  }

  .logo {
    color: #fff;
    font-size: 17px;
  }
`;
