import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import { FiltersContainer } from "./filters.style";
import Axios from "../axios";

const Filters = (props) => {
  const [links, setLinks] = useState({ link1: "", link2: "", link3: "" });
  const [enablePv, setEnablePv] = useState(false);
  const [disableChat, setDisableChat] = useState(false);

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
          "/login?forStudent=true&href=" +
          window.location.href
      );
      // window.alert("لینک کلاس کپی شد");
    }
  };

  return (
    <FiltersContainer className="row">
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
        <div onClick={() => copy("1")} className="link">
          RTMP لینک
        </div>
        <div onClick={() => copy("2")} className="link">
          RTMP کلید
        </div>
        <div onClick={() => copy("3")} className="link">
          لینک کلاس
        </div>
      </div>
    </FiltersContainer>
  );
};

export default Filters;
