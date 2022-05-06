import styled from "styled-components";

const AdminContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #888;
  padding: 16px;

  .boxesContainer {
    width: 100%;
    height: 100%;
    margin-left: 6px;
  }

  .leftSide {
    height: 100%;
    padding: 0;
  }

  .rightSide {
    height: 100%;
  }

  .onlineUsersBox {
    height: 49%;
  }

  .chatBox {
    height: 49%;
    margin-top: 4%;
  }

  .filtersBox {
    width: 100%;
    background-color: ${(props) =>
      props.colors.main ? props.colors.main : "black"};
    height: 12%;
    border-radius: 4px;
  }

  .stream {
    height: ${(props) => (props.role === "TEACHER" ? "86.5%" : "100%")};
    margin-top: ${(props) => (props.role === "TEACHER" ? "1%" : "0%")};
    background-color: ${(props) =>
      props.colors.main ? props.colors.main : "black"};
    border-radius: 4px;
  }

  @media screen and (max-width: 768px) {
    padding-right: 25px;
    .onlineUsersBox {
      margin-top: 12px;
    }
    .stream {
      height: ${(props) => (props.role === "TEACHER" ? "82.5%" : "100%")};
    }
    .filtersBox {
      height: 18%;
    }
  }
`;

export default AdminContainer;
