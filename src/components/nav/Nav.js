import React, { useState } from "react";
import "./Nav.scss";

import userIcon from "../../assets/images/user.svg";
import logo from "../../assets/images/logo.png";

import edit from "../../assets/images/Edit-profile.svg";
import logoutIcon from "../../assets/images/logout.svg";

import caret from "../../assets/images/down-arrow.svg";
import { withRouter } from "react-router-dom";

export default withRouter(function Nav(props) {
  const [open, setopen] = useState(false);
  const [show_nav, setshow_nav] = useState(false);

  const logout = () => {
    props.history.push("/login");
  };

  const toProfile = () => {
    props.history.push("/dashboard/profile");
  };

  return (
    <div className="nav">
      <span className="logo">
        <img src={logo} className="logo" alt="" />
      </span>
      <span className="user f-right">
        <div className="avatar">
          <img src={userIcon} height="30" alt="" />
        </div>
        Chisom Blessing
        <img
          src={caret}
          style={{
            width: 10,
            marginLeft: 12,
            transform: open ? `rotate(180deg)` : "",
          }}
          alt=""
        />
        <div className="dropdown">
          <ul>
            <li className="bb" onClick={toProfile}>
              Edit profile <img src={edit} className="f-right m15" alt="" />{" "}
            </li>
            <li onClick={logout}>
              Logout <img src={logoutIcon} className="f-right m15" alt="" />{" "}
            </li>
          </ul>
        </div>
      </span>

      <div
        id="nav-icon1"
        onClick={() => setshow_nav(!show_nav)}
        className={show_nav ? "open" : ""}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`mobilenav ${show_nav ? "open" : ""}`}>
        <input type="text" placeholder="What do you want learn?" />

        <p>Courses</p>
        <p>Edit Profile</p>
        <p>Logout</p>
      </div>
    </div>
  );
});
