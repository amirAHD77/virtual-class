import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import StyledDiv from "./questions.style";
const AddQuestion = (props) => {
  const [item, setItem] = useState({
    id: 1,
    title: "سوال تست سوال تست سوال تست سوال تست سوال تست؟",
    questions: [
      {
        id: 1,
        content: "الف یک است",
        isAnswer: false,
        point: 0, // DONT CHANGE IT
      },
      {
        id: 2,
        content: "ب دو است",
        isAnswer: true,
        point: 0, // DONT CHANGE IT
      },
      {
        id: 1,
        content: "پ سه است",
        isAnswer: false,
        point: 0, // DONT CHANGE IT
      },
    ],
  });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  console.log(props);
  const submit = () => {
    props.socket.emit("answerVote", {
      id: item.id,
      room: props.roomName,
      uuid: sessionStorage.getItem("userId"),
      answer: selectedAnswer,
    });
  };
  return (
    <Modal
      dialogClassName="modal3"
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <StyledDiv>
        <h3>پاسخ نظرسنجی</h3>

        <p>{item.title}</p>
        <div className="answerContainer">
          {item.questions?.map((ans, index) => {
            return (
              <div key={index} className={"answer"}>
                <label className="answerNum">{index + 1}</label>-
                <input
                  className="mx-2"
                  checked={selectedAnswer === index}
                  type="radio"
                  onChange={() => setSelectedAnswer(index)}
                />{" "}
                <span>{ans.content}</span>
                {/* <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    const text = e.target.value;
                    const temp = [...answerList];
                    temp[index] = text;
                    setAnswerList(temp);
                  }}
                /> */}
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
