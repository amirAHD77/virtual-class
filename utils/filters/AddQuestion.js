import React, { useState, useEffect } from "react";
import { Container, Modal, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

import StyledDiv from "./questions.style";
const AddQuestion = (props) => {
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [pageStatus, setPageStatus] = useState("results");
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

  useEffect(() => {
    setPageStatus(props.voteResults ? "results" : "add");
    console.log("props.voteResults", props.voteResults);
  }, [props.voteResults]);
  return (
    <Modal
      dialogClassName="modal3"
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <StyledDiv>
        {pageStatus === "results" ? (
          <>
            <h3>نتایج نظرسنجی</h3>
            {props?.voteResults?.questions && (
              <h5 className="mt-4">{props?.voteResults?.title}</h5>
            )}
            <div>
              {props?.voteResults?.questions &&
                props.voteResults.questions.map((it, index) => {
                  return (
                    <div className="resultContainer" key={index}>
                      <div className="resultPercent">
                        %{parseInt(it.percent)}
                      </div>
                      <div className="resultContentContainer">
                        <div className="resultContent">{it.content}</div>
                        <div className="resultProgress">
                          <ProgressBar
                            variant={it.isAnswer ? "success" : "danger"}
                            now={parseInt(it.percent)}
                            visuallyHidden={true}
                          />
                        </div>
                      </div>
                      {/* <div className="resultCount"> {it.point}</div>نفر */}
                    </div>
                  );
                })}
            </div>
            <div onClick={() => setPageStatus("add")} className="newResultBtn">
              ایجاد نظرسنجی جدید
            </div>
          </>
        ) : (
          <>
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
            <Row className="mt-3">
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
                <label className="me-3" htmlFor="true">
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
                <label className="me-3" htmlFor="false">
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
            <div className="btnContainer">
              <button onClick={() => submit()} className="submitBtn">
                ثبت
              </button>
              <div
                onClick={() => setPageStatus("results")}
                className="cancelBtn"
              >
                لغو
              </div>
            </div>
          </>
        )}
      </StyledDiv>
    </Modal>
  );
};

export default AddQuestion;
