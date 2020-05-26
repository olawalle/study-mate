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
  const logout = () => {
    props.history.push("/login");
  };
  return (
    <div className="nav">
      <span className="logo">
        <img src={logo} height="44" style={{ marginTop: 17 }} alt="" />
      </span>
      <span className="user f-right" onClick={() => setopen(!open)}>
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
      </span>

      <div
        className="dropdown"
        onClick={() => setopen(!open)}
        style={{ display: open ? "block" : "none" }}
      >
        <ul>
          <li className="bb">
            Edit profile <img src={edit} className="f-right m15" alt="" />{" "}
          </li>
          <li onClick={logout}>
            Logout <img src={logoutIcon} className="f-right m15" alt="" />{" "}
          </li>
        </ul>
      </div>
    </div>
  );
});
