import React from "react";
import "./Subject.scss";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import Nav from "../../components/nav/Nav";
import Lesson from "../../components/lesson/Lesson";
import Quiz from "../../components/quiz/Quiz";
import students from "../../assets/images/students.png";
import backArrow from "../../assets/images/back.svg";
import { withRouter } from "react-router-dom";
// import students from "../../assets/images/students.png";

export default withRouter(function Subject({ history }) {
  const back = () => {
    history.push("/dashboard/");
  };

  const gotoPacks = () => {
    history.push("/studypack/mathematics");
  };

  return (
    <div className="subject">
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
          Mathematics
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
          <p className="header">Study Levels</p>
          <div className="level">Beginner</div>
          <div className="level">Intermediate</div>
          <div className="level">Advanced</div>

          <img src={students} alt="" />
        </div>
        <div className="wide">
          <p className="heading">Beginner</p>
          <div className="lessons-wrap mb30">
            <div className="lessons">
              <Lesson />
              <Lesson />
              <Lesson />
              <Lesson />
              <Lesson />
            </div>
          </div>

          <Quiz />

          <p className="heading">Intermediate</p>
          <div className="lessons-wrap mb30">
            <div className="lessons">
              <Lesson />
              <Lesson />
              <Lesson />
              <Lesson />
              <Lesson />
            </div>
          </div>

          <Quiz />

          <p className="heading">Advanced</p>
          <div className="lessons-wrap mb30">
            <div className="lessons">
              <Lesson />
              <Lesson />
              <Lesson />
              <Lesson />
              <Lesson />
            </div>
          </div>

          <Quiz />

          <div className="pack">
            <div className="half">
              <p>Advance your learning</p>
              <div className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              <div className="duration">
                <span>12 Study packs</span>
                <span>9 - 12 minutes</span>
              </div>
              <button onClick={gotoPacks} className="tw-btn">
                Lets get started
              </button>
            </div>
            <div className="half bg"></div>
          </div>
        </div>
      </div>
    </div>
  );
});
