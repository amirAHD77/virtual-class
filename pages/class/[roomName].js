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

const Admin = () => {
  const Router = useRouter();

  const [token, setToken] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const role = useRef();
  const socket = useRef();
  const name = useRef();
  const [disableChat, setDisableChat] = useState(false);
  const [privateChat, setPrivateChat] = useState(false);
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
        : null;
      role.current = sessionStorage?.getItem("role")
        ? sessionStorage.getItem("role")
        : "STUDENT";
      if (!sessionStorage.getItem("token") || !sessionStorage.getItem("name")) {
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
      console.log(reason);
    });
    socket.current.on("roomUsers", (data) => {
      console.log("data", data);
      setUsers(data.users);
    });

    socket.current.on("privateChat", (data) => {
      console.log(data);
    });

    socket.current.on("message", (data) => {
      console.log("data1", data);
      if (data.type === "MESSAGE") {
        setMessages((prevState) => [data, ...prevState]);
      } else if (
        data.type === "NOTIFICATION" &&
        data.text === "چت غیر فعال شد"
      ) {
        setDisableChat(true);
      } else if (data.type === "NOTIFICATION" && data.text === "چت فعال شد") {
        setDisableChat(false);
      } else if (
        data.type === "NOTIFICATION" &&
        data.text === "پیام خصوصی فعال شد"
      ) {
        setPrivateChat(true);
      } else if (
        data.type === "NOTIFICATION" &&
        data.text === "پیام خصوصی غیر فعال شد"
      ) {
        setPrivateChat(false);
      }
    });

    return () => {
      console.log("websocket unmounting!!!!!");
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
    } else if (role.current === "STUDENT" && sessionStorage.getItem("token")) {
      const res = await Axios.get(
        `v1/class/student/private/${Router?.query?.roomName}`,
        {
          headers: {
            Authorization: `Bearer ${tokenAvailability}`,
          },
        }
      );
      setClassData({ class: res.data.data });
    }
  };

  const joinRoom = () => {
    socket.current.emit("joinRoom", {
      fullName: name.current,
      room: classData?.class?.class?.name,
      type: role.current,
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
      function (response) {
        console.log(123, response); // ok
      }
    );
  };
  return (
    <AdminContainer role={role.current} colors={colors}>
      <Head>
        <title>این‌پوینت کانکت</title>
        <link rel="shortcut icon" href="/images/inpoint connect logo PNG.png" />
      </Head>
      <div className="boxesContainer row">
        <div className="leftSide col-12 col-md-9">
          {role.current === "TEACHER" && (
            <div className="filtersBox">
              <Filters socket={socket.current} classData={classData} />
            </div>
          )}
          <div className="stream">
            <Stream classData={classData} role={role.current} />
          </div>
        </div>
        <div className="rightSide col-12 col-md-3">
          <div className="onlineUsersBox ">
            <OnlineUsers users={users} />
          </div>
          <div className="chatBox ">
            <ChatBox
              sendMessage={sendMessage}
              messages={messages}
              disableChat={disableChat}
              privateChat={privateChat}
            />
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default Admin;
