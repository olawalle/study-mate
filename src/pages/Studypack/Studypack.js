import React, { useContext } from "react";
import "./Studypack.scss";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import Nav from "../../components/nav/Nav";
import Lesson from "../../components/lesson/Lesson";
import Quiz from "../../components/quiz/Quiz";
import students from "../../assets/images/students.png";
import backArrow from "../../assets/images/back.svg";
import { withRouter } from "react-router-dom";
import { userContext } from "../../store/UserContext";
// import students from "../../assets/images/students.png";

export default withRouter(function Studypack({ history }) {
  const context = useContext(userContext);
  const { selectedSubject } = context;
  const back = () => {
    history.push("/dashboard/");
  };
  return (
    <div className="studypack">
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
          Study pack
        </span>
      </div>
      <div className="sub-banner">
        <div className="small">
          <span>Possible points:</span>
          <p>1000</p>
        </div>
        <div className="wide">
          <div className="progresses">
            <div className="progress-wrap">
              <ProgressBar />
              <span>level 1(400 study points)</span>
            </div>
            <div className="progress-wrap">
              <ProgressBar />
              <span>level 1(400 study points)</span>
            </div>
            <div className="progress-wrap">
              <ProgressBar />
              <span>level 1(400 study points)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contents">
        <div className="small">
          <p className="header">Study Pack</p>
          <div className="level">Studtpack 1</div>
          <div className="level">Studtpack 2</div>
          <div className="level">Studtpack 3</div>

          <img src={students} alt="" />
        </div>
        <div className="wide list">
          {selectedSubject &&
            selectedSubject.quizzes &&
            selectedSubject.quizzes.length && (
              <Quiz quiz={selectedSubject.quizzes} />
            )}
        </div>
      </div>
    </div>
  );
});
