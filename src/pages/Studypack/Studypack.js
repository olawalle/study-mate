import React, { useContext, useEffect } from "react";
import "./Studypack.scss";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import Nav from "../../components/nav/Nav";
import Lesson from "../../components/lesson/Lesson";
import Quiz from "../../components/quiz/Quiz";
import Loader from "../../components/loader/Loader";
import students from "../../assets/images/students.png";
import backArrow from "../../assets/images/back.svg";
import { withRouter } from "react-router-dom";
import { userContext } from "../../store/UserContext";
// import students from "../../assets/images/students.png";

export default withRouter(function Studypack({ history }) {
  const context = useContext(userContext);
  const { selectedSubject, studyPacks, loading } = context;
  const back = () => {
    history.push("/dashboard/");
  };
  useEffect(() => {
    console.log(studyPacks);
  }, []);
  return (
    <>
      {loading && <Loader />}
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

            <span className="desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              temporibus dolorum, laborum aut libero aliquam omnis tempore nulla
              mollitia quasi quidem nihil in sunt harum maiores porro ex
              reiciendis amet!
            </span>
            <img src={students} alt="" />
          </div>
          <div className="wide list">
            {studyPacks &&
              studyPacks.length &&
              studyPacks
                .map((quiz, i) => {
                  return (
                  <Quiz
                    quiz={quiz.id}
                    quizId={quiz.id}
                    name={`Study pack ${i + 1}`}
                    shortDescription={quiz.shortDescription}
                    quizType="studypack"
                    quizPackDetails={quiz}
                  />
                )})}
          </div>
        </div>
      </div>
    </>
  );
});
