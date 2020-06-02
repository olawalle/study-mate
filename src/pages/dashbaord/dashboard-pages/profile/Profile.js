import React, { useState } from "react";
import "./Profile.scss";
import Switch from "react-switch";
import Links from "../../../../components/sidebar/Links";
import Leaderboard from "../../../../components/leaderboard/Leaderboard";
import Badges from "../../../../components/badges/Badges";

export default function Profile() {
  const [checked, setchecked] = useState(true);
  const handleChange = () => {};
  return (
    <div className="profile">
      <div className="links-wrap">
        <Links />
      </div>
      <div className="wide">
        <p className="heading">My Profile</p>
        <div className="form"></div>

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
