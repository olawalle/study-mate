import React, { useContext, useEffect, useState } from "react";
import "./Studypack.scss";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import Nav from "../../components/nav/Nav";
import Lesson from "../../components/lesson/Lesson";
import Quiz from "../../components/quiz/Quiz";
import Loader from "../../components/loader/Loader";
import students from "../../assets/images/students.png";
import backArrow from "../../assets/images/back.svg";
import { withRouter, useParams, useLocation } from "react-router-dom";
import { userContext } from "../../store/UserContext";
import { retrieveItem } from "../../services/ls";
import authServices from "../../services/authServices";
// import students from "../../assets/images/students.png";

export default withRouter(function Studypack({ history }) {
  const { subject } = useParams();
  const context = useContext(userContext);
  const {
    fixBack,
    updatefixBack,
    userCourses,
    studyPacks,
    loading,
    selectedSubject: { id, ...selectedSubject },
    updateLoader,
  } = context;
  console.log({ userCourses, studyPacks, selectedSubject });

  const [total, setTotal] = useState();
  const back = () => {
    // history.push(`/preview-subject/${selectedSubject.id}`);
    history.goBack();
  };

  useEffect(() => {
    updatefixBack(false);
  }, []);

  useEffect(() => {
    updatefixBack(false);
    updateLoader(true);
    authServices
      .getQuizCount(id)
      .then((res) => {
        console.log({ testes: res.data });
        setTotal(res.data.score);
        updateLoader(false);
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
  }, [id]);

  useEffect(() => {
    if (window.location.hash.includes("studypack/")) {
      onbeforeunload = function (e) {
        return "Are you sure?";
      };
    }
  }, []);

  useEffect(() => {
    return () => {
      onbeforeunload = null;
    };
  });

  const getUserTests = (id) => {
    const usertests = retrieveItem("usertests");
    console.log({ usertests, id });
    if (usertests) {
      const ut = usertests.filter((ut) => ut.testId === id);
      console.log({ ut });
      return ut;
    }
    return [];
  };

  const getTotalScore = () => {
    const usertests = retrieveItem("usertests");
    let score = 0;
    if (usertests) {
      score = usertests.reduce((agg, cur) => {
        agg += cur.score;
        return agg;
      }, 0);
    }
    return score;
  };

  const getCourseId = () => {
    if (userCourses) {
      const u = userCourses.find(
        (uc) => uc.course.name.toLowerCase() === subject.toLowerCase()
      );
      if (u) {
        return u.id;
      }
    }
  };

  useEffect(() => {
    console.log(studyPacks);
  }, []);

  console.log("fixback", fixBack);

  return (
    <>
      {loading && <Loader />}
      <div className={`studypack ${fixBack ? "fixed" : "not-fixed"}`}>
        <div className="navwrap">
          <Nav />
        </div>
        <div className="banner">
          <span className="backArrow" style={{ textTransform: "uppercase" }}>
            <svg
              version="1.1"
              x="0px"
              y="0px"
              height="15"
              className="mr25"
              viewBox="0 0 512.005 512.005"
              onClick={back}
              style={{
                transform: "rotate(180deg)",
                position: "relative",
                top: "-1px",
                cursor: "pointer",
              }}
            >
              <g>
                <g>
                  <path
                    fill="#ffffff"
                    d="M388.418,240.923L153.751,6.256c-8.341-8.341-21.824-8.341-30.165,0s-8.341,21.824,0,30.165L343.17,256.005
                      L123.586,475.589c-8.341,8.341-8.341,21.824,0,30.165c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251
                      l234.667-234.667C396.759,262.747,396.759,249.264,388.418,240.923z"
                  />
                </g>
              </g>
            </svg>
            {subject} Study pack
          </span>
          {/* <span onClick={back} className="mobile-title-text">
            HOME
          </span> */}
        </div>
        <div className="sub-banner">
          <div className="small">
            <span>Possible points:</span>
            <p>{total}</p>
          </div>
          <div className="wide">
            <div className="progresses">
              <div className="progress-wrap">
                <ProgressBar />
                <span>Accumulated Score ({getTotalScore()} study points)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contents">
          <div className="small">
            {/* <p className="header">Study Pack</p> */}

            <p className="desc">
              Our Study Packs are advanced tests created to assess your
              proficiency in various subjects and to improve your learning
              progress. They can be experienced in three mediums based on your
              preference. <br /> <br />
              <p>
                <span className="dot"></span> Learn mode
              </p>
              <p>
                <span className="dot"></span> Time mode
              </p>
              <p>
                <span className="dot"></span> Free form mode.
              </p>
            </p>
            <img src={students} alt="" />
          </div>
          <div className="wide list">
            {studyPacks &&
              studyPacks.length &&
              studyPacks.map((quiz, i) => {
                return (
                  <Quiz
                    key={quiz.id}
                    type="study"
                    usercourseid={getCourseId()}
                    userquizzes={getUserTests(quiz.id)}
                    quiz={quiz.id}
                    open={true}
                    quizId={quiz.id}
                    name={`Study pack ${i + 1}`}
                    shortDescription={quiz.shortDescription}
                    quizType="studypack"
                    quizPackDetails={quiz}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
});
