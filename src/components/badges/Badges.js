import React from "react";
import "./Badges.scss";
export default function Badges() {
  return (
    <div className="badges">
      <p className="heading">Badge count</p>
      <div className="medals">
        <div className="medal bg_1"></div>
        <div className="medal bg_2"></div>
        <div className="medal bg_3"></div>
        <div className="medal bg_4"></div>
        <div className="medal bg_5"></div>
      </div>
    </div>
  );
}
