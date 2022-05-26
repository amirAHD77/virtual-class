import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { FiltersContainer } from "./filters.style";
import Axios from "../axios";
import { useRouter } from "next/router";

const Filters = (props) => {
  const [links, setLinks] = useState({ link1: "", link2: "", link3: "" });
  const [enablePv, setEnablePv] = useState(false);
  const [disableChat, setDisableChat] = useState(false);
  const Router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
    try {
      const res = await Axios.get(
        `v1/class/start-end`,
        {
          class_id: props.classData?.class?.class?.id,
          state: false,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenAvailability}`,
          },
        }
      );
      Router.reload();
    } catch (err) {
      console.error(err);
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
      <Modal
        dialogClassName="modal2"
        show={isOpen}
        onHide={() => setIsOpen(false)}
      >
        <Button variant="primary" onClick={() => copy("1")} className="link">
          RTMP لینک
        </Button>
        <Button variant="secondary" onClick={() => copy("2")} className="link">
          RTMP کلید
        </Button>
        <Button variant="warning" onClick={() => copy("3")} className="link">
          لینک کلاس
        </Button>
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
        <Button variant="danger" onClick={() => endClass()}>
          اتمام کلاس
        </Button>
        <Button onClick={() => setIsOpen(true)}>تنضیمات</Button>
      </div>
    </FiltersContainer>
  );
};

export default Filters;
