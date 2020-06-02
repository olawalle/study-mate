import React from "react";
import "./Leaderboard.scss";

import b1 from "../../assets/images/b1.svg";
import b2 from "../../assets/images/b2.svg";
import b3 from "../../assets/images/b3.svg";
import best from "../../assets/images/Best.svg";

export default function Leaderboard() {
  return (
    <div className="leaderboard">
      <p className="heading">Leaderboard</p>
      <div className="people">
        <div className="person first">
          <img src={b1} alt="" />
          <img
            className="photo"
            src="https://randomuser.me/api/portraits/men/82.jpg"
            alt=""
          />
          <span className="name">Isabelle Allen</span>

          <span className="points">2,516 pts.</span>
          <img src={best} className="best" alt="" />
        </div>
        <div className="person second">
          <img src={b2} alt="" />
          <img
            className="photo"
            src="https://randomuser.me/api/portraits/men/82.jpg"
            alt=""
          />
          <span className="name">Isabelle Allen</span>

          <span className="points">2,516 pts.</span>
        </div>
        <div className="person third">
          <img src={b3} alt="" />
          <img
            className="photo"
            src="https://randomuser.me/api/portraits/men/82.jpg"
            alt=""
          />
          <span className="name">Isabelle Allen</span>

          <span className="points">2,516 pts.</span>
        </div>

        <div className="person others">
          <span className="position">4</span>
          <img
            className="photo"
            src="https://randomuser.me/api/portraits/men/82.jpg"
            alt=""
          />
          <span className="name">Isabelle Allen</span>

          <span className="points">2,516 pts.</span>
        </div>

        <div className="person others">
          <span className="position">5</span>
          <img
            className="photo"
            src="https://randomuser.me/api/portraits/men/82.jpg"
            alt=""
          />
          <span className="name">Isabelle Allen</span>

          <span className="points">2,516 pts.</span>
        </div>

        <p className="my">My position</p>

        <div className="person mine">
          <span className="position">45</span>
          <img
            className="photo"
            src="https://randomuser.me/api/portraits/men/82.jpg"
            alt=""
          />
          <span className="name">Isabelle Allen</span>

          <span className="points">2,516 pts.</span>
        </div>
      </div>
    </div>
  );
}
