import styled from "styled-components";

export default styled.div`
  width: 100%;
  /* height: 100%; */
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
    flex-direction: column;
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
  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .submitBtn {
    min-height: 40px;
    background-color: #5f88be;
    border-radius: 8px;
    width: 100px;
    border: 0;
    color: #fff;
    margin-right: 4px;
  }

  .cancelBtn {
    min-height: 40px;
    background-color: #e2e2e2;
    border-radius: 8px;
    width: 100px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #000;
  }
  .remove {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: white;
    margin-right: 15px;
    font-size: 14px;
    padding-right: 1px;
    color: black;
  }
  .answerNum {
    width: unset !important;
    min-width: 8px;
    text-align: center;
  }

  .resultContainer {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
    margin-top: 32px;
  }

  .resultPercent {
    font-size: 20px;
    width: 50px;
  }

  .resultContentContainer {
    margin-right: 16px;
    width: 300px;
    direction: rtl;
  }
  .resultContent {
    font-size: 18px;
  }

  .resultProgress {
  }

  .resultCount {
    margin-right: 16px;
    padding-left: 8px;
    font-size: 18px;
  }

  .newResultBtn {
    background-color: #7090e8;
    font-size: 18px;
    color: #fff;
    padding: 8px 16px;
    text-align: left;
    width: 190px;
    border-radius: 8px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;
