import React, { useState } from "react";
import { Container, Modal, Row } from "react-bootstrap";
import StyledDiv from "./questions.style";
const AddQuestion = (props) => {
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const submit = () => {
    props.setShow(false);
    props.socket.emit("deleteVote", {
      room: props.roomName,
    });
    props.socket.emit("createVote", {
      title: question,
      room: props.roomName,
      showAnswer: showAnswer,
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
        <h3>تعریف نظرسنجی</h3>
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
        <Row>
          <span>نمایش پاسخ</span>
          <Container>
            <input
              checked={showAnswer}
              className="me-3"
              type="radio"
              onChange={() => setShowAnswer(true)}
              value={true}
              name="true"
            />
            <label className="me-3" for="true">
              بله
            </label>
            <input
              checked={!showAnswer}
              className="me-3"
              type="radio"
              value={false}
              onChange={() => setShowAnswer(false)}
              name="false"
            />
            <label className="me-3" for="false">
              خیر
            </label>
          </Container>
        </Row>
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
                <span
                  onClick={() => {
                    const temp = [...answerList];
                    temp.splice(index, 1);
                    setAnswerList(temp);
                  }}
                  className="remove"
                >
                  x
                </span>
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
