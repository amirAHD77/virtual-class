import React from "react";
import { IoPeople, IoPerson } from "react-icons/io5";

import { OnlineUsersContainer } from "./onlineUsers.style";
import { colors } from "../config";
import { GoKebabVertical } from "react-icons/go";
import { Dropdown } from "react-bootstrap";
import Axios from "../axios";

const OnlineUsers = (props) => {
  const Icon = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <GoKebabVertical style={{ position: "relative" }} />
    </a>
  ));
  return (
    <OnlineUsersContainer colors={colors}>
      <div className="header">
        <div className="headerLogo">
          <IoPeople style={{ fontSize: 20 }} color="white" />
        </div>
        <div className="headerTitle">کاربران ({props.users.length})</div>
      </div>
      {console.log(props.users)}
      <div className="namesBox">
        {props.users.map((it, index) => (
          <div className="nameContainer" key={index}>
            {console.log("it", it)}
            <div
              className="logo"
              style={it.type === "TEACHER" ? { color: "#ffa500" } : null}
            >
              <IoPerson />
            </div>
            <div className="name">
              {it?.fullName?.length ? it.fullName : null}
              {props.role === "TEACHER" && it.type !== "TEACHER" && (
                <Dropdown align="end">
                  <Dropdown.Toggle align="end" as={Icon}></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => props.kickUser(it.uuid, it.id)}
                      bsPrefix="dropdownItem"
                    >
                      اخراج
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        ))}
      </div>
    </OnlineUsersContainer>
  );
};

export default OnlineUsers;
