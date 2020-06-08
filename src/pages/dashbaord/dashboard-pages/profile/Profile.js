import React, { useState, useContext } from "react";
import "./Profile.scss";
import Switch from "react-switch";
import Links from "../../../../components/sidebar/Links";
import Leaderboard from "../../../../components/leaderboard/Leaderboard";
import Badges from "../../../../components/badges/Badges";
import { userContext } from "../../../../store/UserContext";

export default function Profile() {
  const context = useContext(userContext);
  const { user } = context;
  console.log(user);
  const [checked, setchecked] = useState(true);
  return (
    <div className="profile">
      <div className="links-wrap">
        <Links />
      </div>
      <div className="wide">
        <p className="heading">Personal Information</p>
        <div className="form">
          <div className="half">
            <span>Full name</span>
            <p>{`${user.firstName} ${user.surName}`}</p>
          </div>
          <div className="half">
            <span>Username</span>
            <p>{user.firstName}</p>
          </div>
          <div className="half">
            <span>Email address</span>
            <p>{user.email}</p>
          </div>
          <div className="half">
            <span>Location</span>
            <p>{}</p>
          </div>
          <div className="half">
            <button className="blue-btn">Edit my profile</button>
          </div>
          <div className="half"></div>
        </div>

        <div className="badgess">
          <Badges />
        </div>
      </div>
      <div className="small">
        <Leaderboard />
      </div>
    </div>
  );
}
