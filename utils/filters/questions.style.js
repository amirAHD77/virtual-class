import styled from "styled-components";

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  background-color: rgb(60, 90, 130) !important;
  border-radius: 12px;
  text-align: right;
  padding: 30px;
  color: #fff;
  h3 {
    text-align: center;
  }
  .heading {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    & > span {
      font-size: 12px;
      cursor: pointer;
    }
  }

  .answerContainer {
    color: #fff;
    display: flex;
    margin-top: 35px;

    flex-direction: row-reverse;
    flex-wrap: wrap;
    width: 100%;
    & > div {
      margin-left: 12px;
      display: inline-flex;
      flex-direction: row-reverse;
      margin-bottom: 12px;
      align-items: center;
      & > label {
        margin-left: 12px;
        font-size: 12px;
        width: 40px;
      }
      & > input:nth-child(3) {
        height: 100%;
        margin-right: 12px;
        text-align: right;
        border-radius: 8px;
        padding: 4px;
      }
    }
  }
  .textArea {
    border-radius: 12px;
    margin-top: 15px;
    min-height: 80px;
    margin-bottom: 12px;
    text-align: right;
    padding: 12px;
  }
  .submitBtn {
    height: 40px;
    background-color: #f90;
    margin: auto;
    border-radius: 8px;
    width: 200px;
  }
  .remove {
    border: 2px solid red;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: tomato;
    margin-right: 15px;
    font-size: 20px;
    padding-right: 1px;
    color: black;
  }
  .answerNum {
    width: unset !important;
  }
`;
