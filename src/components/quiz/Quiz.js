import React from "react";
import "./Quiz.scss";

import dots from "../../assets/images/Dots.svg";
import pattern1 from "../../assets/images/pattern1.png";
import pattern2 from "../../assets/images/pattern2.png";

export default function Quiz() {
  return (
    <div className="quiz">
      <p className="quiz-heading">Quiz 1</p>
      <p className="sub-heading">
        Level up on the above skills and collect up to 400 Mastery points
      </p>

      <button className="blue-btn">Resume Quiz</button>

      <div className="patterns">
        <img src={dots} className="dots" alt="" />
        <img src={pattern2} className="pattern2" alt="" />
        <img src={pattern1} className="pattern1" alt="" />
      </div>
    </div>
  );
}
