import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

import StyledDiv from "./questions.style";

const AddQuestion = (props) => {
  const [item, setItem] = useState(props.question);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answered, setAnswered] = useState(false);
  React.useLayoutEffect(() => {
    setItem(props.question);
  }, [props.question]);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setAnswered(false);
  }, [props.question?.id]);

  const submit = () => {
    console.log("selectedAnswer", selectedAnswer);
    setAnswered(true);
    props.socket.emit("answerVote", {
      id: item.id + 1,
      room: props.roomName,
      uuid: sessionStorage.getItem("userId"),
      answer: selectedAnswer + 1,
    });
    if (item.showAnswer) {
      setShowAnswer(true);
      return;
    }
    // props.setShow(false);
    // props.closeToast();
  };
  return (
    <Modal
      dialogClassName="modal3"
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <StyledDiv>
        {item && (
          <>
            <p className="closeBtn" onClick={() => props.setShow(false)}>
              X
            </p>
            <p>{item.title}</p>
            <div className="answerContainer">
              {item.questions?.map((ans, index) => {
                return (
                  <div key={index} className={"answer"}>
                    <label className="answerNum">{index + 1}</label>-{""}
                    {selectedAnswer === index && (
                      <FaCheckCircle
                        style={{
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: -1,
                          fontSize: 22,
                          minWidth: 22,
                          marginRight: 8,
                        }}
                        color={
                          showAnswer && item.showAnswer && !ans.isAnswer
                            ? "red"
                            : showAnswer && item.showAnswer && ans.isAnswer
                            ? "#78f542"
                            : "#7090e8"
                        }
                      />
                    )}
                    {selectedAnswer !== index && (
                      <div
                        onClick={() => !answered && setSelectedAnswer(index)}
                        style={{
                          minWidth: 22,
                          height: 22,
                          borderRadius: 11,
                          border: "1px solid white",
                          marginRight: 8,
                          backgroundColor: answered ? "#ccc" : "white",
                        }}
                      />
                    )}
                    {"  "}
                    <span
                      style={{
                        marginRight: 8,
                        color:
                          showAnswer && item.showAnswer && ans.isAnswer
                            ? "#78f542"
                            : showAnswer && item.showAnswer && !ans.isAnswer
                            ? "red"
                            : "white",
                      }}
                    >
                      {"  " + ans.content + "   "}
                    </span>
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
          </>
        )}
        {!answered && (
          <button onClick={() => submit()} className="submitBtn">
            ثبت
          </button>
        )}
      </StyledDiv>
    </Modal>
  );
};

export default AddQuestion;
