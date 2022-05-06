import React from "react";
import { IoPeople, IoPerson } from "react-icons/io5";

import { OnlineUsersContainer } from "./onlineUsers.style";
import { colors } from "../config";

const OnlineUsers = (props) => {
  return (
    <OnlineUsersContainer colors={colors}>
      <div className="header">
        <div className="headerLogo">
          <IoPeople style={{ fontSize: 20 }} color="white" />
        </div>
        <div className="headerTitle">کاربران ({props.users.length})</div>
      </div>
      <div className="namesBox">
        {props.users.map((it, index) => (
          <div className="nameContainer" key={index}>
            <div className="logo">
              <IoPerson />
            </div>
            <div className="name">
              {it?.fullName?.length ? it.fullName : null}
            </div>
          </div>
        ))}
      </div>
    </OnlineUsersContainer>
  );
};

export default OnlineUsers;
