import React from "react";
import "./Badges.scss";

import coins from "../../assets/images/coins.svg";
import trophy from "../../assets/images/Trophy.svg";
import Badge1 from "../../assets/images/Badge1.svg";
import Badge2 from "../../assets/images/Badge2.svg";
import Medal from "../../assets/images/Medal.svg";

export default function Badges() {
  return (
    <div className="badges">
      <p className="heading">Badge count</p>
      <div className="medals">
        <div className="medal b1">
          <img src={coins} alt="" />
          <span>5</span>
        </div>
        <div className="medal b2">
          <img src={trophy} alt="" />
          <span>7</span>
        </div>
        <div className="medal b3">
          <img src={Medal} alt="" />
          <span>12</span>
        </div>
        <div className="medal b4">
          <img src={Badge1} alt="" />
          <span>10</span>
        </div>
        <div className="medal b5">
          <img src={Badge2} alt="" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
