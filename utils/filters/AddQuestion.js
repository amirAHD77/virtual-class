import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import StyledDiv from "./questions.style";
const AddQuestion = (props) => {
  const [question, setQuestion] = useState("");
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const submit = () => {
    console.log({
      title: question,
      room: props.roomName,
      showAnswer: false,
      uuid: sessionStorage.getItem("userId"),
      questions: answerList.map((it, ind) => ({
        id: ind + 1,
        content: it,
        isAnswer: ind === correctAnswer,
        point: 0,
      })),
    });
    props.socket.emit("createVote", {
      title: question,
      room: props.roomName,
      showAnswer: false,
      uuid: sessionStorage.getItem("userId"),
      questions: answerList.map((it, ind) => ({
        id: ind + 1,
        content: it,
        isAnswer: ind === correctAnswer,
        point: 0,
      })),
    });
  };
  return (
    <Modal
      dialogClassName="modal3"
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <StyledDiv>
        <h3>تعریف سوال</h3>
        <div className="heading">
          <label>سوال</label>
          <span onClick={() => setAnswerList([...answerList, ""])}>
            افرودن پاسخ
          </span>
        </div>
        <textarea
          className="textArea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="answerContainer">
          {answerList.map((answer, index) => {
            return (
              <div key={index} className={"answer"}>
                <label>پاسخ {index + 1}</label>
                <input
                  checked={correctAnswer === index}
                  type="radio"
                  onChange={() => setCorrectAnswer(index)}
                />

                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    const text = e.target.value;
                    const temp = [...answerList];
                    temp[index] = text;
                    setAnswerList(temp);
                  }}
                />
              </div>
            );
          })}
        </div>
        <button onClick={() => submit()} className="submitBtn">
          ثبت
        </button>
      </StyledDiv>
    </Modal>
  );
};

export default AddQuestion;
