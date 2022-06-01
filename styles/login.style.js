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
    display: flex;
    position: relative;
    z-index: 1;
  }
  .whiteBox {
    align-items: center;
    display: flex;
    z-index: 2;
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
    height: 85vh;
    /* position: absolute; */
    /* border: 3px solid
      ${(props) => (props.colors.second ? props.colors.second : "black")}; */
    border-radius: 18px;
    padding: 60px;
    width: 368px;
    margin-left: -184px;
    @media (max-width: 460px) {
      width: 100%;
      height: 100%;
      padding: 20px 45px;
      margin: 0;
    }
  }

  .form {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    > div:nth-child(3) {
      margin-top: 10px;
    }
    > label {
      /* margin-top: 10px; */
    }
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 460px) {
      margin-bottom: 25px;
    }
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
    background-color: #efefef;
    border-radius: 14px;
    margin-top: 8px;
    height: 40px;
    font-size: 12px;

    &:hover {
      /* border: 1px solid #fe8f00; */
    }
    &:focus {
      box-shadow: 0px 0px 11px 5px rgba(0, 0, 0, 0.03);

      background-color: #fff;
      /* border: 2px solid #fe8f00; */
    }
  }
  .otpinput {
    /* padding: 4px 8px; */
    border-radius: 8px;
    text-align: right;
    border: 0;
    width: 100%;
    border-radius: 14px;
    margin-top: 8px;
    height: 40px;
    font-size: 12px;
    display: inline-flex;
    justify-content: center;

    & > input {
      margin-right: 8px;
      border-radius: 12px;
      border: 1px solid #aaa;
      width: 24px !important;
      height: 40px;
      &:last-child {
        margin-right: 0 !important;
      }
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
    margin-top: 5px;
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
    background-color: #767676;
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

  .switchMode {
    background-color: inherit;
    color: #aaa;
    text-align: center;
  }

  .switchMode:hover {
    color: lightblue;
    cursor: pointer;
  }

  .supportText:hover {
    cursor: pointer;
  }
`;
export default LoginContainer;
