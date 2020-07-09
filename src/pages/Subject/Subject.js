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
import { withRouter, useRouteMatch } from "react-router-dom";
import { userContext } from "../../store/UserContext";
import authServices from "../../services/authServices";
import { useEffect } from "react";
// import students from "../../assets/images/students.png";

export default withRouter(function Subject({ history }) {
  let match = useRouteMatch();
  const context = useContext(userContext);
  const {
    selectedSubject,
    updateLoader,
    updateStudyPack,
    loading,
    user,
  } = context;
  const [usertests, setusertests] = useState(null);
  const [linkIndex, setlinkIndex] = useState(0);
  const [testId, settestId] = useState(0);
  const [usercourseid, setusercourseid] = useState(0);
  const [pageLoaded, setpageLoaded] = useState(false);
  const [level, setlevel] = useState(null);
  const [links, setlinks] = useState([
    { text: "Beginner" },
    { text: "Intermediate" },
    { text: "Advanced" },
  ]);

  useEffect(() => {
    setlevel(match.params.level);
    updateLoader(true);
    authServices
      .getUcourseWithTests(user.id, selectedSubject.id)
      .then((res) => {
        const defaultTestId =
          selectedSubject &&
          selectedSubject.tests &&
          selectedSubject.tests.length
            ? selectedSubject.tests[0].id
            : 0;
        settestId(defaultTestId);
        setusercourseid(res.data.id);
        setusertests(res.data.userTests);
        updateLoader(false);
        setpageLoaded(true);
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
    console.log(selectedSubject);
  }, [pageLoaded]);

  const back = () => {
    history.push("/dashboard/");
  };

  const gotoPacks = () => {
    updateLoader(true);
    authServices
      .getCourseByName(selectedSubject.name)
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
    history.goBack();
  };

  const pickLevel = (test, i) => {
    settestId(test.id);
    setlevel(test.year);
  };

  const generateLevelTest = (id, tests) => {
    const test = tests.find((t) => t.year === level);
    if (test) {
      const beginnerQuiz = test.quizes.filter((q) => q.level === 0);
      const intermediateQuiz = test.quizes.filter((q) => q.level === 1);
      const advancedQuiz = test.quizes.filter((q) => q.level === 2);
      const fourQuiz = test.quizes.filter((q) => q.level === 3);
      const fiveQuiz = test.quizes.filter((q) => q.level === 4);
      const sixQuiz = test.quizes.filter((q) => q.level === 5);
      const sevenQuiz = test.quizes.filter((q) => q.level === 6);
      const eightQuiz = test.quizes.filter((q) => q.level === 7);
      const nineQuiz = test.quizes.filter((q) => q.level === 8);
      const tenQuiz = test.quizes.filter((q) => q.level === 8);

      const beginnerVideo = test.videos.filter((q) => q.level === 0);
      const intermediateVideo = test.videos.filter((q) => q.level === 1);
      const advancedVideo = test.videos.filter((q) => q.level === 2);
      const fourVideo = test.videos.filter((q) => q.level === 3);
      const fiveVideo = test.videos.filter((q) => q.level === 4);
      const sixVideo = test.videos.filter((q) => q.level === 5);
      const sevenVideo = test.videos.filter((q) => q.level === 6);
      const eightVideo = test.videos.filter((q) => q.level === 7);
      const nineVideo = test.videos.filter((q) => q.level === 8);
      const tenVideo = test.videos.filter((q) => q.level === 9);

      const returnCandidate = [
        {
          id: test.id,
          take: !!beginnerVideo.length,
          quizzes: beginnerQuiz,
          videos: beginnerVideo,
        },
        {
          id: test.id,
          take: !!intermediateVideo.length,
          quizzes: intermediateQuiz,
          videos: intermediateVideo,
        },
        {
          id: test.id,
          take: !!advancedVideo.length,
          quizzes: advancedQuiz,
          videos: advancedVideo,
        },
        {
          id: test.id,
          take: !!fourVideo.length,
          quizzes: fourQuiz,
          videos: fourVideo,
        },
        {
          id: test.id,
          take: !!fiveVideo.length,
          quizzes: fiveQuiz,
          videos: fiveVideo,
        },
        {
          id: test.id,
          take: !!sixVideo.length,
          quizzes: sixQuiz,
          videos: sixVideo,
        },
        {
          id: test.id,
          take: !!sevenVideo.length,
          quizzes: sevenQuiz,
          videos: sevenVideo,
        },
        {
          id: test.id,
          take: !!eightVideo.length,
          quizzes: eightQuiz,
          videos: eightVideo,
        },
        {
          id: test.id,
          take: !!nineVideo.length,
          quizzes: nineQuiz,
          videos: nineVideo,
        },
        {
          id: test.id,
          take: !!tenVideo.length,
          quizzes: tenQuiz,
          videos: tenVideo,
        },
      ];

      return returnCandidate.filter((r) => r.take);
    }
    return [];
  };

  const getPreviousQuiz = (usertest, quizzes) => {
    if (usertest) {
      const intersection = usertest.userQuizzes.filter((value) =>
        quizzes.some((q) => q.id === value.quizId)
      );
      return intersection;
    }
    return [];
  };

  return (
    <>
      {loading && <Loader />}
      <div className="subject">
        <div className="nav-wrap">
          <Nav />
        </div>
        <div className="banner">
          <span onClick={toCourses} className="mobile-title-text">
            Learning Levels
          </span>
          <span className="back" style={{ textTransform: "capitalize" }}>
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
            {selectedSubject.name}
          </span>
        </div>
        <div className="sub-banner">
          {/* <div className="small">
            <span>Possible points:</span>
            <p>1000</p>
          </div> */}
          <div className="wide">
            <div className="progresses">
              {usertests &&
                usertests.userTests &&
                usertests.userTests.map((utest) => {
                  return (
                    <div key={utest.id} className="progress-wrap">
                      <ProgressBar />
                      <span>
                        {selectedSubject.tests.find(
                          (t) => t.id == utest.testId
                        ) &&
                          selectedSubject.tests.find(
                            (t) => t.id == utest.testId
                          ).year}
                        ({utest.score} study points)
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="contents">
          <div className="small">
            <p className="header">Study Levels</p>
            {selectedSubject &&
              selectedSubject.tests &&
              selectedSubject.tests.map((test, i) => (
                <div
                  key={test.id}
                  onClick={() => pickLevel(test, i)}
                  className={`level ${testId === test.id ? "active" : ""}`}
                >
                  <div className="band">
                    <div className="inner"></div>
                  </div>
                  <span>{test.year}</span>
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
          <div className="wide big">
            {selectedSubject &&
              selectedSubject.tests &&
              generateLevelTest(testId, selectedSubject.tests).map(
                (test, i) => (
                  <React.Fragment key={"lesson_" + i}>
                    <p className="heading">Lessons</p>
                    <div className="lessons-wrap mb30">
                      <div className="lessons">
                        {test.videos.length ? (
                          test.videos.map((video, i) => (
                            <Lesson
                              key={"video" + video.id + "" + i}
                              video={video}
                              grade={linkIndex}
                              disableClick={false}
                            />
                          ))
                        ) : (
                          <div
                            className="blue--text"
                            style={{
                              padding: "12px 30px",
                              margin: 0,
                              fontSize: 12,
                            }}
                          >
                            There are no video lessons in this pack. Kindly
                            check back later.
                          </div>
                        )}
                      </div>
                    </div>
                    {test.quizzes.length ? (
                      <Quiz
                        open={true}
                        usertests={
                          usertests && usertests.length
                            ? usertests.filter((ut) => ut.testId === test.id)
                            : []
                        }
                        userquizzes={getPreviousQuiz(
                          usertests &&
                            usertests.find((ut) => ut.testId === test.id),
                          test.quizzes
                        )}
                        usercourseid={usercourseid}
                        quizType="normal"
                        quiz={test.quizzes}
                      />
                    ) : null}
                  </React.Fragment>
                )
              )}

            {selectedSubject.hasStudyPack && (
              <div className="pack">
                <div className="half">
                  <p className="title">Advance your learning</p>
                  <div className="desc">
                    <p style={{ fontSize: 12 }}>
                      Our Study Packs are test questions created for advanced
                      Senior Secondary levels. They are simulated for exam
                      purposes and further learning.
                    </p>
                    {/* <p style={{ fontSize: 12 }}>
                      Our Study Packs are test questions created for advanced
                      Senior Secondary levels. They are simulated for exam
                      purposes and further learning.
                    </p>
                    <p style={{ fontSize: 12 }}>
                      Note: The Lesson Packs above must have been completed
                      before proceeding to the Study Packs.
                    </p> */}
                  </div>
                  <div className="duration">
                    <span>Approximately 12 Study packs</span>
                  </div>
                  <button onClick={gotoPacks} className="btn">
                    Lets get started
                  </button>
                </div>
                <div className="half bg"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
