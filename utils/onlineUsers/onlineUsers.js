import React from "react";
import { IoPeople, IoPerson } from "react-icons/io5";

import { OnlineUsersContainer } from "./onlineUsers.style";
import { colors } from "../config";
import { GoKebabVertical } from "react-icons/go";
import { Dropdown } from "react-bootstrap";
import Axios from "../axios";

const OnlineUsers = (props) => {
  console.log("props", props);
  const kickUser = async () => {
    const res = Axios.post("v1/class/kick", {});
  };
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
      <div className="namesBox">
        {props.users.map((it, index) => (
          <div className="nameContainer" key={index}>
            <div
              className="logo"
              style={
                it.type === "TEACHER" ? { color: "rgb(24, 44, 97)" } : null
              }
            >
              <IoPerson />
            </div>
            <div className="name">
              {it?.fullName?.length ? it.fullName : null}
              {it.type == "TEACHER" && (
                <Dropdown align="end">
                  <Dropdown.Toggle align="end" as={Icon}></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item bsPrefix="dropdownItem">اخراج</Dropdown.Item>
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
