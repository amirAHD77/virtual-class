import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Head from "next/head";

import AdminContainer from "../../styles/index.style";
import { colors, api } from "../../utils/config";
import OnlineUsers from "../../utils/onlineUsers/onlineUsers";
import ChatBox from "../../utils/chatBox/chatBox";
import Stream from "../../utils/stream/stream";
import Filters from "../../utils/filters/filters";
import { useRouter } from "next/router";
import Axios from "../../utils/axios";
import { Toast, ToastContainer } from "react-bootstrap";
import AnswerQuestion from "../../utils/filters/AnswerQuestion";
const Admin = () => {
  const Router = useRouter();

  const [token, setToken] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const role = useRef();
  const socket = useRef();
  const name = useRef();
  const [question, setQuestion] = useState(null);
  const [voteResults, setVoteResults] = useState(null);
  const [disableChat, setDisableChat] = useState(false);
  const [privateChat, setPrivateChat] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [classData, setClassData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== undefined) {
      setToken(
        sessionStorage?.getItem("token")
          ? sessionStorage.getItem("token")
          : null
      );
      name.current = sessionStorage?.getItem("name")
        ? sessionStorage.getItem("name")
        : router.query.firstName
        ? router.query?.firstName + " " + router.query?.lastName
        : null;
      role.current = sessionStorage?.getItem("role")
        ? sessionStorage.getItem("role")
        : "STUDENT";

      if (
        !router.query.firstName &&
        (!sessionStorage.getItem("token") || !sessionStorage.getItem("name"))
      ) {
        Router.push("/login");
      }
    }
    socket.current = io(api.socket, {
      transport: ["websocket"],
    });
    socket.current.on("connect", () => {
      joinRoom();
    });

    socket.current.on("error", (err) => {
      console.log(err);
    });
    socket.current.on("connect_timeout", function (err) {
      console.log("client connect_timeout: ", err);
    });

    socket.current.on("connect_error", (as) => {
      console.log("error", as);
    });
    socket.current.on("disconnect", (reason) => {
      console.log("disconnect", reason);
    });
    socket.current.on("roomUsers", (data) => {
      setUsers(data.users);
    });

    socket.current.on("privateChat", (data) => {
      // console.log(data);
    });
    socket.current.on("isDuplicateUser", (data) => {
      // console.log("duplicate", data);
      if (data === true) {
        window.alert("شما قبلا وارد شده اید");
        router.push(
          role.current === "TEACHER"
            ? "/login"
            : window.location.origin +
                "/login?forStudent=true&type=" +
                classData?.class?.class?.login_type +
                " &href=" +
                window.location.href
        );
      }
    });
    socket.current.on("isKicked", (data) => {
      // console.log("kicked", data);
      if (data === true) {
        window.alert("شما از کلاس اخراج شدید");
        router.push(
          window.location.origin +
            "/login?forStudent=true&type=" +
            classData?.class?.class?.login_type +
            " &href=" +
            window.location.href
        );
      }
    });
    socket.current.on("message", (data) => {
      if (data?.type === "MESSAGE") {
        setMessages((prevState) => [data, ...prevState]);
      } else if (
        data?.type === "NOTIFICATION" &&
        data.text === "چت غیر فعال شد"
      ) {
        setDisableChat(true);
      } else if (data?.type === "NOTIFICATION" && data.text === "چت فعال شد") {
        setDisableChat(false);
      } else if (
        data?.type === "NOTIFICATION" &&
        data?.text === "پیام خصوصی فعال شد"
      ) {
        setPrivateChat(true);
      } else if (
        data?.type === "NOTIFICATION" &&
        data?.text === "پیام خصوصی غیر فعال شد"
      ) {
        setPrivateChat(false);
      } else {
        if (!data?.type && data?.length > -1) setMessages(data);
        // console.log(3434, data);
      }
    });
    socket.current.on("pmessage", (data) => {
      // console.log("messages", data);
      setMessages(data);
    });
    socket.current.on("getVoteStudent", (msg) => {
      console.log("getVo2teStudent", msg);
      setQuestion(msg);
    });
    socket.current.on("getVoteTeacher", (msg) => {
      console.log("getVoteTeacher", msg);
      setVoteResults(msg);
    });
    socket.current.on("answerVote", (msg) => {
      console.log("answerVote", msg);
    });
    socket.current.on("createVote", (msg) => {
      console.log("createVote", msg);
    });
    socket.current.on("startStop", function (response) {
      // console.log("startStop", response); // ok
    });
    return () => {
      console.log("websock2et unmounting!!!!!");
      socket.current.off();
      socket.current.disconnect();
    };
  }, [classData]);

  useEffect(() => {
    setTimeout(() => {
      const tokenAvailability = sessionStorage.getItem("token");
      getClassData();
    }, 400);
  }, []);

  const getClassData = async () => {
    if (!Router.query.roomName) {
      Router.push("/login");
      return;
    }
    const tokenAvailability = sessionStorage.getItem("token");
    try {
      if (role.current === "TEACHER" && sessionStorage.getItem("token")) {
        const res = await Axios.get(
          `v1/class/teacher/${Router?.query?.roomName}`,
          {
            headers: {
              Authorization: `Bearer ${tokenAvailability}`,
            },
          }
        );
        setClassData(res.data.data);
      } else if (
        role.current === "STUDENT" &&
        sessionStorage.getItem("token") &&
        !router.query.firstName
      ) {
        const res = await Axios.get(
          `v1/class/student/private/${Router?.query?.roomName}`,
          {
            headers: {
              Authorization: `Bearer ${tokenAvailability}`,
            },
          }
        );
        setClassData({ class: res.data.data });
      } else if (router.query.firstName) {
        const res = await Axios.post(
          `v1/class/student/public/${Router?.query?.roomName}`,
          {
            first_name: router.query.firstName,
            last_name: router.query.lastName,
            phone_number: router.query.phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenAvailability}`,
            },
          }
        );
        setClassData({ class: res.data.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const joinRoom = () => {
    const userId = sessionStorage.getItem("userId");

    socket.current.emit("joinRoom", {
      fullName: name.current,
      room: classData?.class?.class?.name,
      type: role.current,
      uuid: userId,
    });
  };
  const sendMessage = async (text) => {
    socket.current.emit(
      "chatMessage",
      {
        text: text,
        room: classData?.class?.class?.name,
        type: role.current,
      },
      function (response) {}
    );
  };
  const deleteMessage = async (id) => {
    socket.current.emit(
      "deleteMessage",
      {
        messageId: id,
        room: classData.class?.class?.name,
      },
      function (response) {}
    );
  };

  const kickUser = async (id, socketId) => {
    socket.current.emit(
      "kickUser",
      {
        uuid: id,
        socketId: socketId,
        room: classData.class?.class?.name,
      },
      function (response) {}
    );
  };

  const startStop = async (status) => {
    socket.current.emit(
      "startStop",
      {
        status: status,
        room: classData.class?.class?.name,
      },
      function (response) {}
    );
  };

  return (
    <AdminContainer role={role.current} colors={colors}>
      <Head>
        <title>غرب‌آنلاین کانکت-رویداد</title>
        <link rel="shortcut icon" href="/images/inpoint connect logo PNG.png" />
      </Head>
      <div className="boxesContainer row">
        <AnswerQuestion
          socket={socket.current}
          show={openAnswer}
          question={question}
          setShow={setOpenAnswer}
          roomName={classData?.class?.class?.name}
          closeToast={() => setQuestion(null)}
        />
        <div className="leftSide col-12 col-md-9">
          {role.current === "TEACHER" && (
            <div className="filtersBox">
              <Filters
                startStop={startStop}
                socket={socket.current}
                classData={classData}
                voteResults={voteResults}
              />
            </div>
          )}

          <Toast
            onClick={() => setOpenAnswer(true)}
            show={
              role.current !== "TEACHER" && question !== null && question?.id
            }
            // onClose={() => setQuestion(null)}
            className="toast"
          >
            <Toast.Header>
              <strong
                onClick={() => setOpenAnswer(true)}
                className="me-auto cursor-pointer"
              >
                نظرسنجی
              </strong>
            </Toast.Header>
          </Toast>

          <div className="stream">
            <Stream classData={classData} role={role.current} />
          </div>
        </div>
        <div className="rightSide col-12 col-md-3">
          {role.current === "TEACHER" && (
            <div className="onlineUsersBox ">
              <OnlineUsers
                role={role.current}
                classData={classData}
                users={users}
                kickUser={kickUser}
              />
            </div>
          )}
          <div
            className="chatBox "
            style={role.current !== "TEACHER" ? { height: "98%" } : {}}
          >
            <ChatBox
              sendMessage={sendMessage}
              messages={messages}
              disableChat={disableChat}
              privateChat={privateChat}
              role={role.current}
              deleteMessage={deleteMessage}
            />
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default Admin;
