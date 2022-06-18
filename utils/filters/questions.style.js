import styled from "styled-components";

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  background-color: #333;
  border: 2px solid #f90;
  border-radius: 12px;
  text-align: right;
  padding: 30px;
  color: #fff;
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
      & > label {
        margin-left: 12px;
        font-size: 12px;
        width: 40px;
      }
      & > input:nth-child(2) {
        height: 100%;
        margin-left: 5px;
      }
    }
  }
  .textArea {
    border-radius: 12px;
    margin-top: 15px;
    min-height: 80px;
  }
  .submitBtn {
    height: 30px;
    background-color: #f90;
    border-radius: 8px;
    width: 90px;
  }
  .answerNum {
    width: unset !important;
  }
`;
