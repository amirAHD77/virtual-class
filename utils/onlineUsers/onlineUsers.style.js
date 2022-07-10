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
    @media only screen and (max-device-height: 640px) and (orientation: landscape) {
      height: 13%;
    }
  }

  .headerTitle {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
  }

  .namesBox {
    direction: rtl;
    flex: 1;
    background-color: rgb(226, 226, 226);
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
    color: #111;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .logo {
    color: #111;
    font-size: 17px;
  }

  .dropdownItem {
    font-size: 12px;
    text-decoration: none;
    color: #fff;
  }
`;
