import React, { useState } from "react";
import "./Profile.scss";
import Switch from "react-switch";

export default function Profile() {
  const [checked, setchecked] = useState(true);
  const handleChange = () => {};
  return (
    <div className="profile">
      <div className="wide">
        <p className="heading">Edit Profile</p>
        <div className="form">
          <span className="label">First Name</span>
          <input type="text" />

          <span className="label">Surname</span>
          <input type="text" />

          <span className="label">Email address</span>
          <input type="text" />

          <span className="label">Password</span>
          <input type="text" />
        </div>
      </div>
      <div className="small">
        <p className="heading">Learning Statistics</p>
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

          <button className="tw-btn">Contact support</button>
          <button className="tw-btn">Provacy</button>
        </div>
      </div>
    </div>
  );
}
