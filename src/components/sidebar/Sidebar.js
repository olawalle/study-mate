import React, { useState } from "react";
import "./Sidebar.scss";
import students from "../../assets/images/students.png";
import { useRouteMatch, Link } from "react-router-dom";

import userIcon from "../../assets/images/user.svg";
import editIcon from "../../assets/images/edit.svg";

import Links from "./Links";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="upper">
        <div className="user">
          <img
            src={userIcon}
            style={{ height: "100%", margin: " 12px auto" }}
            alt=""
          />
          <div className="edit">
            <img
              src={editIcon}
              style={{ height: "20px", margin: "10px auto" }}
              alt=""
            />
          </div>
        </div>
        <p className="user-details">
          Chisom Blessing
          <span>Junior secondary</span>
        </p>
        <Links />
      </div>

      <img src={students} alt="" className="students" />
    </div>
  );
}
