import React, { useState, useContext } from "react";
import "./Sidebar.scss";
import students from "../../assets/images/students.png";
import { useRouteMatch, Link, withRouter } from "react-router-dom";

import userIcon from "../../assets/images/user.svg";
import editIcon from "../../assets/images/edit.svg";

import Links from "./Links";
import { userContext } from "../../store/UserContext";

export default withRouter(function Sidebar({ history }) {
  const context = useContext(userContext);
  const fullname = `${context.user.firstName} ${context.user.surName}`;

  const toProfile = () => {
    history.push("/edit-profile");
  };
  return (
    <div className="sidebar">
      <div className="upper">
        <div className="user">
          <img
            src={userIcon}
            style={{ height: "100%", margin: " 12px auto" }}
            alt=""
          />
          <div className="edit_" onClick={toProfile}>
            <img
              src={editIcon}
              style={{ height: "20px", margin: "10px auto" }}
              alt=""
            />
          </div>
        </div>
        <p className="user-details">
          {fullname}
          <span>Junior secondary</span>
        </p>
        <Links />
      </div>

      <img src={students} alt="" className="students" />
    </div>
  );
});
