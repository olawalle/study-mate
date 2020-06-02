import React, { useState } from "react";
import "./Edit.scss";

import Switch from "react-switch";
import Links from "../../../../components/sidebar/Links";
import edit from "../../../../assets/images/edit.svg";
import Nav from "../../../../components/nav/Nav";
import backArrow from "../../../../assets/images/back.svg";
import { withRouter } from "react-router-dom";

export default withRouter(function EditProfile({ history }) {
  const [checked, setchecked] = useState(true);
  const handleChange = () => {};
  const back = () => {
    history.push("/dashboard/");
  };
  return (
    <div className="edit">
      <Nav />
      <div className="banner">
        <span>
          <img
            src={backArrow}
            height="25"
            className="mr10"
            alt=""
            onClick={back}
            style={{ position: "relative", top: 5, cursor: "pointer" }}
          />
          Edit Profile
        </span>
      </div>
      <div className="contents">
        <div className="wide">
          <p className="heading">Edit Profile</p>
          <div className="form">
            <span className="label">Full Name</span>
            <div className="inp-wrap">
              <input type="text" />
              <img src={edit} alt="" />
            </div>

            <span className="label">Create Username</span>
            <div className="inp-wrap">
              <input type="text" />
              <img src={edit} alt="" />
            </div>

            <span className="label">Email address</span>
            <div className="inp-wrap">
              <input type="text" />
              <span>verify email</span>
            </div>

            <span className="label">Password</span>
            <input type="text" />

            <button className="tw-btn">Save changes</button>
          </div>
        </div>
        <div className="small">
          <p className="heading">General</p>
          <div className="switches">
            <p>
              Sound effects{" "}
              <span>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={25}
                  width={50}
                  className="react-switch"
                />
              </span>
            </p>
            <p>
              Haptic feedback{" "}
              <span>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={25}
                  width={50}
                  className="react-switch"
                />
              </span>
            </p>
            <p>
              Motivational messages{" "}
              <span>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={25}
                  width={50}
                  className="react-switch"
                />
              </span>
            </p>

            <button className="tw-btn">Contact support</button>
            <button className="tw-btn">Terms/Privacy</button>
          </div>
        </div>
      </div>
    </div>
  );
});
