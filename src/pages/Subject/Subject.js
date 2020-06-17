import React, { useContext, useState } from "react";
import "./Subject.scss";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import Nav from "../../components/nav/Nav";
import Loader from "../../components/loader/Loader";
import Lesson from "../../components/lesson/Lesson";
import Quiz from "../../components/quiz/Quiz";
import students from "../../assets/images/students.png";
import dots from "../../assets/images/Dots.svg";
import backArrow from "../../assets/images/back.svg";
import { withRouter } from "react-router-dom";
import { userContext } from "../../store/UserContext";
import authServices from "../../services/authServices";
import { useEffect } from "react";
// import students from "../../assets/images/students.png";

export default withRouter(function Subject({ history }) {
  const context = useContext(userContext);
  const { selectedSubject, updateLoader, updateStudyPack, loading } = context;
  const [links, setlinks] = useState([
    { text: "Beginner" },
    { text: "Intermediate" },
    { text: "Advanced" },
  ]);

  const [linkIndex, setlinkIndex] = useState(0);

  useEffect(() => {
    console.log(selectedSubject);
  }, []);

  const back = () => {
    history.push("/dashboard/");
  };

  const gotoPacks = () => {
    console.log(selectedSubject);
    updateLoader(true);
    authServices
      .getCourseByName(selectedSubject.alias)
      .then((res) => {
        console.log(res);
        updateStudyPack(res.data.tests);
        updateLoader(false);
        history.push(`/studypack/${selectedSubject.name}`);
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
  };

  const toCourses = () => {
    history.push(`/dashboard/mobile-courses`);
  };

  const pickLevel = (i) => {
    updateLoader(true);
    // dunno what should be done here so this is for demo :(
    setTimeout(() => {
      updateLoader(false);
      setlinkIndex(i);
    }, 2000);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="subject">
        <Nav />
        <div className="banner">
          <span onClick={toCourses} className="mobile-title-text">
            Courses
          </span>
          <span className="back" style={{ textTransform: "capitalize" }}>
            <img
              src={backArrow}
              height="25"
              className="mr10"
              alt=""
              onClick={back}
              style={{ position: "relative", top: 5, cursor: "pointer" }}
            />
            {selectedSubject.name}
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
                <span>Basic(400 study points)</span>
              </div>
              <div className="progress-wrap">
                <ProgressBar />
                <span>Intermediate(400 study points)</span>
              </div>
              <div className="progress-wrap">
                <ProgressBar />
                <span>Advanced(400 study points)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contents">
          <div className="small">
            <p className="header">Study Lessons</p>
            {links.map((link, i) => (
              <div
                key={link.text}
                onClick={() => pickLevel(i)}
                className={`level ${i === linkIndex ? "active" : ""}`}
              >
                <div className="band">
                  <div className="inner"></div>
                </div>
                <span>{link.text}</span>
              </div>
            ))}

            <img src={students} alt="" />
            <img
              src={dots}
              alt=""
              style={{
                width: 60,
                float: "left",
                position: "relative",
                top: 230,
                left: "-250px",
              }}
            />
          </div>
          <div className="wide">
            <p className="heading">Lesson pack 1</p>
            <div className="lessons-wrap mb30">
              {!selectedSubject.videos.filter(v => v.level === 0).length && (
                <p style={{ padding: "12px 30px", margin: 0, fontSize: 12 }}>
                  There are no video lessons in this pack. Kindly check back
                  later.
                </p>
              )}
              <div className="lessons">
                {selectedSubject.videos.filter(v => v.level === 0).map((video, i) => (
                  <Lesson
                    key={"video" + i}
                    video={video}
                    disableClick={false}
                  />
                ))}
              </div>
            </div>
            {selectedSubject &&
            selectedSubject.quizzes &&
            selectedSubject.quizzes.filter(q => q.level === 0).length ? (
              <Quiz
                open={true}
                quizType="normal"
                quiz={selectedSubject.quizzes.filter(q => q.level === 0)}
              />
            ) : null}

            <p className="heading">Lesson pack 2</p>
            <div className="lessons-wrap mb30">
              {!selectedSubject.videos.filter(v => v.level === 1).length && (
                <p style={{ padding: "12px 30px", margin: 0, fontSize: 12 }}>
                  There are no video lessons in this pack. Kindly check back
                  later.
                </p>
              )}
              <div className="lessons">
                {selectedSubject.videos.filter(v => v.level === 1).map((video, i) => (
                  <Lesson
                    key={"video" + i}
                    video={video}
                    disableClick={false}
                  />
                ))}
              </div>
            </div>
            {selectedSubject &&
            selectedSubject.quizzes &&
            selectedSubject.quizzes.filter(q => q.level === 1).length ? (
              <Quiz
                open={true}
                quizType="normal"
                quiz={selectedSubject.quizzes.filter(q => q.level === 1)}
              />
            ) : null}

            <p className="heading">Lesson pack 3</p>
            <div className="lessons-wrap mb30">
              {!selectedSubject.videos.filter(v => v.level === 2).length && (
                <p style={{ padding: "12px 30px", margin: 0, fontSize: 12 }}>
                  There are no video lessons in this pack. Kindly check back
                  later.
                </p>
              )}
              <div className="lessons">
                {selectedSubject.videos.filter(v => v.level === 2).map((video, i) => (
                  <Lesson
                    key={"video" + i}
                    video={video}
                    disableClick={false}
                  />
                ))}
              </div>
            </div>
            {selectedSubject &&
            selectedSubject.quizzes &&
            selectedSubject.quizzes.filter(q => q.level === 2).length ? (
              <Quiz
                open={true}
                quizType="normal"
                quiz={selectedSubject.quizzes.filter(q => q.level === 2)}
              />
            ) : null}
            {selectedSubject.alias && <div className="pack">
              <div className="half">
                <p className="title">Advance your learning</p>
                <div className="desc">
                  <p style={{ fontSize: 12 }}>
                    Our Study Packs are Test questions created for advanced
                    Senior Secondary levels. They are simulated for further
                    learning and for exam purposes. Note that the Study Lessons
                    above must have been completed before proceeding to the
                    Study packs.
                  </p>
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
          }
          </div>
        </div>
      </div>
    </>
  );
});
