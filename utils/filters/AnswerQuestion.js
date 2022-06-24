import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import StyledDiv from "./questions.style";
const AddQuestion = (props) => {
  const [item, setItem] = useState(props.question);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  React.useLayoutEffect(() => {
    setItem(props.question);
  }, [props.question]);

  const submit = () => {
    props.socket.emit("answerVote", {
      id: item.id,
      room: props.roomName,
      uuid: sessionStorage.getItem("userId"),
      answer: selectedAnswer,
    });
    if (item.showAnswer) {
      setShowAnswer(true);
      return;
    }
    props.setShow(false);
    props.closeToast();
  };
  return (
    <Modal
      dialogClassName="modal3"
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <StyledDiv>
        <h3 style={{ textAlign: "center" }}>پاسخ نظرسنجی</h3>

        {item && (
          <>
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
                    <span
                      style={{
                        color:
                          showAnswer && item.showAnswer && ans.isAnswer
                            ? "#78f542"
                            : showAnswer && item.showAnswer && !ans.isAnswer
                            ? "red"
                            : "white",
                      }}
                    >
                      {ans.content}
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
        <button onClick={() => submit()} className="submitBtn">
          ثبت
        </button>
      </StyledDiv>
    </Modal>
  );
};

export default AddQuestion;
