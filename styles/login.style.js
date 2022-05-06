import styled from "styled-components";

const LoginContainer = styled.div`
  /* width: 100vw; */
  height: 100vh;
  background-color: ${(props) =>
    props?.colors?.mainLight ? props?.colors?.mainLight : "black"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .boxContainer {
    background-color: #eee;
    height: 350px;
    border: 3px solid
      ${(props) => (props.colors.second ? props.colors.second : "black")};
    border-radius: 12px;
    padding: 16px;
    position: relative;
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
    margin-top: 8px;
    height: 45px;
    box-shadow: 0px 0px 11px 5px rgba(0, 0, 0, 0.03);
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
    background-color: #2a5a38;
    height: 50px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    font-size: 18px;
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
    position: absolute;
    bottom: -100px;
    width: 90%;
    text-align: center;
    font-weight: bold;
    color: #666;
    font-size: 16px;
    border: 3px solid #28773f;
    margin-left: 5px;
    padding: 12px;
    border-radius: 12px;
  }

  .supportText:hover {
    cursor: pointer;
  }
`;
export default LoginContainer;
