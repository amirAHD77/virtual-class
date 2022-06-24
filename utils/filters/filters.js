import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";

import { FiltersContainer } from "./filters.style";
import Axios from "../axios";
import { useRouter } from "next/router";
import AddQuestion from "./AddQuestion";

const Filters = (props) => {
  const [links, setLinks] = useState({ link1: "", link2: "", link3: "" });
  const [enablePv, setEnablePv] = useState(false);
  const [disableChat, setDisableChat] = useState(false);
  const Router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const pvHandler = () => {
    props.socket.emit("privateChat", {
      room: props.classData.class?.class?.name,
      status: !enablePv,
    });
    setEnablePv(!enablePv);
  };
  const chatHandler = () => {
    props.socket.emit("disableChat", {
      room: props.classData.class?.class?.name,
      status: !disableChat,
    });
    setDisableChat(!disableChat);
  };
  const endClass = async () => {
    if (status) {
      props.startStop(false);
      setStatus(false);
    } else {
      props.startStop(true);
      setStatus(true);
    }
  };
  const getLinks = async () => {};

  useEffect(() => {
    getLinks();
  }, []);

  const copy = (num) => {
    if (num === "1") {
      navigator.clipboard.writeText(props.classData?.class?.stream_url);
      window.alert("لینک RTMP کپی شد");
    } else if (num === "2") {
      navigator.clipboard.writeText(props.classData?.class?.stream_key);
      window.alert("کلید RTMP کپی شد");
    } else if (num === "3") {
      navigator.clipboard.writeText(
        window.location.origin +
          "/login?forStudent=true&type=" +
          props.classData?.class?.class?.login_type +
          " &href=" +
          window.location.href
      );
      setTimeout(() => {
        window.alert("لینک کلاس کپی شد");
      }, 400);
    }
  };

  return (
    <FiltersContainer className="row">
      <AddQuestion
        socket={props.socket}
        show={openAddQuestion}
        setShow={(val) => setOpenAddQuestion(val)}
        roomName={props.classData?.class?.class?.name}
      />
      <Modal
        dialogClassName="modal2"
        show={isOpen}
        onHide={() => setIsOpen(false)}
      >
        <Row>
          <Button variant="primary" onClick={() => copy("1")} className="link">
            RTMP لینک
          </Button>
          <Button
            variant="secondary"
            onClick={() => copy("2")}
            className="link"
          >
            RTMP کلید
          </Button>
          <Button variant="warning" onClick={() => copy("3")} className="link">
            لینک کلاس
          </Button>
        </Row>
      </Modal>
      <div className="switchContainer col-12 col-md-4">
        <Form.Check
          className="switch"
          bg={"success"}
          type="switch"
          id="custom-switch"
          value={enablePv}
          onChange={() => pvHandler()}
        />
        <div className="label">وضعیت چت خصوصی </div>
      </div>
      <div className="switchContainer col-12 col-md-3">
        <Form.Check
          className="switch"
          bg={"success"}
          type="switch"
          id="custom-switch"
          value={disableChat}
          onChange={() => chatHandler()}
        />
        <div className="label">غیر فعال سازی چت</div>
      </div>
      <div className="links col-12 col-md-5">
        <Button
          style={{ backgroundColor: status ? "#2e496e" : "#0063b1" }}
          // variant={status ? "danger" : "success"}
          onClick={() => endClass()}
        >
          {status ? " اتمام کلاس" : "شروع کلاس"}
        </Button>
        <Button
          style={{ backgroundColor: "#e2e2e2", color: "#000" }}
          onClick={() => setIsOpen(true)}
        >
          تنظیمات
        </Button>
        <Button
          onClick={() => setOpenAddQuestion(true)}
          style={{ backgroundColor: "#e2e2e2", color: "#000" }}
        >
          نظرسنجی
        </Button>
      </div>
    </FiltersContainer>
  );
};

export default Filters;
