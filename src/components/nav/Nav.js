import React, { useState } from "react";
import "./Nav.scss";

import userIcon from "../../assets/images/user.svg";
import logo from "../../assets/images/logo.png";
import caret from "../../assets/images/down-arrow.svg";
import { withRouter } from "react-router-dom";

export default withRouter(function Nav(props) {
  const [open, setopen] = useState(false);
  const logout = () => {
    props.history.push("/login");
  };
  return (
    <div className="nav">
      <span className="logo">
        <img src={logo} height="50" style={{ marginTop: 15 }} alt="" />
      </span>
      <span className="user f-right" onClick={() => setopen(!open)}>
        <div className="avatar">
          <img src={userIcon} height="30" alt="" />
        </div>
        Chisom Blessing
        <img
          src={caret}
          style={{
            width: 12,
            marginLeft: 12,
            transform: open ? `rotate(180deg)` : "",
          }}
          alt=""
        />
      </span>

      <div
        className="dropdown"
        onClick={() => setopen(!open)}
        style={{ display: open ? "block" : "none" }}
      >
        <ul>
          <li className="bb">Edit profile</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </div>
    </div>
  );
});
