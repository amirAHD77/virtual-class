import styled from "styled-components";

const LoginContainer = styled.div`
  /* width: 100vw; */
  height: 100vh;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0;
  }
  .container {
    justify-content: flex-end;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .orangeBox {
    background-color: #fe8f00;
    border-radius: 30px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    text-align: center;
  }
  .whiteBox {
    align-items: center;
  }
  .img {
    max-height: 400px !important;
    margin-top: 10vh;
  }
  .heading {
    text-align: center;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
  }
  .caption {
    color: #fff;
    text-align: center;
  }
  .boxContainer {
    background-color: #fff;
    height: 80vh;
    position: absolute;
    /* border: 3px solid
      ${(props) => (props.colors.second ? props.colors.second : "black")}; */
    border-radius: 18px;
    padding: 60px;
    width: 368px;
    margin-left: -184px;
  }

  .form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .label {
    width: 100%;
    text-align: right;
    color: 222;
    font-weight: bold;
  }

  .input {
    padding: 4px 8px;
    border-radius: 8px;
    text-align: right;
    border: 0;
    width: 100%;
    background-color: #eee;
    border-radius: 14px;
    margin-top: 8px;
    height: 45px;

    &:hover {
      border: 1px solid #fe8f00;
    }
    &:focus {
      box-shadow: 0px 0px 11px 5px rgba(0, 0, 0, 0.03);

      background-color: #fff;
      border: 2px solid #fe8f00;
    }
  }

  .input:focus {
    outline: none;
  }

  .err {
    color: red;
    font-size: 13px;
    font-weight: bold;
    text-align: right;
  }

  .button {
    background-color: #fe8f00;
    height: 40px;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    font-size: 11px;
    box-shadow: none;
    border: 0;
    margin-top: 16px;
  }
  .button:hover {
    cursor: pointer;
    background-color: #28773f;
  }

  .supportText {
    color: black;
    /* position: absolute; */
    /* bottom: -100px; */
    width: 90%;
    text-align: center;
    font-weight: bold;
    color: #666;
    font-size: 16px;
    /* border: 3px solid #28773f; */
    /* margin-left: 5px; */
    padding: 12px;
    border-radius: 12px;
  }

  .supportText:hover {
    cursor: pointer;
  }
`;
export default LoginContainer;
