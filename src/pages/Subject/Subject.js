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
import Modal from "react-responsive-modal";
import { saveItem } from "../../services/ls";
// import students from "../../assets/images/students.png";

export default withRouter(function Subject({ history }) {
  let match = useRouteMatch();
  const context = useContext(userContext);
  const {
    fixBack,
    testId_,
    updateTestId,
    selectedSubject,
    updateLoader,
    updateStudyPack,
    loading,
    updatefixBack,
    user,
  } = context;
  const [usertests, setusertests] = useState(null);
  const [linkIndex, setlinkIndex] = useState(0);
  const [testId, settestId] = useState(testId_);
  const [usercourseid, setusercourseid] = useState(0);
  const [pageLoaded, setpageLoaded] = useState(false);
  const [openLevels, setopenLevels] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [name, setname] = useState("");
  const [level, setlevel] = useState(null);
  const [links, setlinks] = useState([
    { text: "Beginner" },
    { text: "Intermediate" },
    { text: "Advanced" },
  ]);
  const [levels, setLevels] = useState([
    "Beginner",
    "Intermediate",
    "Advanced",
  ]);

  useEffect(() => {
    updatefixBack(false);
  }, []);

  useEffect(() => {
    if (openLevels == false) {
      updatefixBack(false);
    }
  }, [fixBack]);
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
        const defaultName =
          selectedSubject &&
          selectedSubject.tests &&
          selectedSubject.tests.length
            ? selectedSubject.tests[testId].name
            : "Beginner";
        settestId(defaultTestId);
        setname(defaultName);
        setusercourseid(res.data.id);
        console.log({ usertest: res.data.userTests });
        setusertests(res.data.userTests);
        updateLoader(false);
        setpageLoaded(true);
        console.log("default test id", defaultTestId);
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
  }, []);

  console.log("selected sub", selectedSubject);

  const back = () => {
    history.push("/dashboard/");
  };
  const back__ = () => {
    history.push("/dashboard/mobile-courses");
  };

  const onSubscribe = () => {
    history.push("/dashboard/subscribe");
  };

  const gotoPacks = () => {
    updateLoader(true);
    setopenLevels(false);
    authServices
      .getCourseByName(selectedSubject.name)
      .then((res) => {
        console.log(res);
        updateStudyPack(res.data.tests);
        updateLoader(false);
        saveItem("usertests", usertests);
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
    setname(test.year);
    settestId(test.id);
    updateTestId(test.id);
    setlevel(test.year);
  };

  console.log("selected id", testId);
  const pickLevel__ = (test, j) => {
    setname(test.year);
    settestId(test.id);
    setlevel(test.year);
    setselectedIndex(j);
  };

  const generateLevelTest = (id, tests) => {
    const test = tests.find((t) => t.id === id);
    //disable one disables the first portion of the video level
    const disableOne = () => {
      //check if the current test has a year called beginner
      const result =
        !(test && test.year.toLowerCase() === "beginner") &&
        user &&
        !user.isSubscribed;
      //if it does, set the disabled property to false
      return result;
    };
    //disable all disables other portion of the video level even the remaining for beginner
    //it is used in combination with disableone
    const disableAll = () => {
      console.log(user.isSubscribed);
      //check if the current test has a year that is not beginner
      const result =
        ((test && test.year.toLowerCase() !== "beginner") ||
          (test && test.year.toLowerCase() === "beginner")) &&
        user &&
        !user.isSubscribed;
      //if it does, set the disabled property to false
      return result;
    };
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
          level: 0,
          disable: disableOne(),
          id: test.id,
          name: test.year,
          take: !!beginnerVideo.length,
          quizzes: beginnerQuiz,
          videos: beginnerVideo,
        },
        {
          level: 1,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!intermediateVideo.length,
          quizzes: intermediateQuiz,
          videos: intermediateVideo,
        },
        {
          level: 2,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!advancedVideo.length,
          quizzes: advancedQuiz,
          videos: advancedVideo,
        },
        {
          level: 3,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!fourVideo.length,
          quizzes: fourQuiz,
          videos: fourVideo,
        },
        {
          level: 4,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!fiveVideo.length,
          quizzes: fiveQuiz,
          videos: fiveVideo,
        },
        {
          level: 5,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!sixVideo.length,
          quizzes: sixQuiz,
          videos: sixVideo,
        },
        {
          level: 6,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!sevenVideo.length,
          quizzes: sevenQuiz,
          videos: sevenVideo,
        },
        {
          level: 7,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!eightVideo.length,
          quizzes: eightQuiz,
          videos: eightVideo,
        },
        {
          level: 8,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!nineVideo.length,
          quizzes: nineQuiz,
          videos: nineVideo,
        },
        {
          level: 9,
          id: test.id,
          disable: disableOne() || disableAll(),
          name: test.year,
          take: !!tenVideo.length,
          quizzes: tenQuiz,
          videos: tenVideo,
        },
      ];
      console.log({ returnCandidate, one: disableOne(), all: disableAll() });

      return returnCandidate.filter((r) => r.take);
    }
    return [];
  };

  const getPreviousQuiz = (usertest, quizzes, level) => {
    if (usertest && quizzes) {
      const intersection = usertest.userQuizzes.filter((value) =>
        quizzes.some((q) => q.id === value.quizId && q.level === level)
      );
      return intersection;
    }
    return [];
  };

    const getUserVideos = (usertests, id) => {
        console.log('uts', usertests, id)
        if (usertests && usertests.length) {
            const data = usertests.find((ut) => ut.testId === id)
            console.log('data', data)
            if (data) {
                return data.userVideos;
            }
        }
            
    
        return [];
  };

  const totalScore = (tests) => {
    if (tests) {
      const score = tests
        .filter((t) => t.studyType === 1)
        .reduce((agg, cur) => {
          agg += cur.quizes.length;
          return agg;
        }, 0);
      return score;
    }
    return 0;
  };

  const getTrailingScores = () => {
    if (usertests && selectedSubject && selectedSubject.tests) {
      const intersection = usertests.filter(
        (u) =>
          selectedSubject.tests.map((t) => t.id).includes(u.testId) &&
          u.userQuizzes &&
          u.userQuizzes.length
      );
      return intersection;
    }
    return [];
  };

  const onCloseLevelsModal = () => {
    setopenLevels(false);
    back__();
  };
  const goToSubject = () => {
    let i = selectedIndex;
    let level = i === 0 ? "Beginner" : i === 1 ? "Intermediate" : "Advanced";
    history.push(`/subject/${selectedSubject.name}/${level}`);
    setopenLevels(false);
  };

  const openLevelsModal = () => {
    if (window.matchMedia("(max-width: 600px)").matches) {
      setopenLevels(true);
    } else {
      back();
      setopenLevels(false);
    }
    //setopenLevels(true);
  };

  return (
    <>
      <Modal
        open={openLevels}
        onClose={onCloseLevelsModal}
        center
        closeOnOverlayClick={true}
      >
        <div className="levels-modal">
          <p className="blue--text">Select User Type</p>
          <div className="levels">
            {selectedSubject &&
              selectedSubject.tests &&
              selectedSubject.tests.map((test, i) => (
                <div>
                  <div
                    key={test.id}
                    onClick={() => pickLevel__(test, i)}
                    className={`level bordered ${
                      i === selectedIndex ? "selected" : ""
                    }`}
                  >
                    <img
                      src={
                        i === 0
                          ? "Beginner"
                          : i === 1
                          ? "Intermediate"
                          : "Advanced"
                      }
                      alt=""
                    />{" "}
                    <span>{test.year}</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="btn">
            <button className="tw-btn" onClick={goToSubject}>
              Start Learning
            </button>
          </div>
        </div>
      </Modal>
      {loading && <Loader />}
      <div className={`subject ${fixBack ? "fixed" : "not-fixed"}`}>
        <div className="nav-wrap">
          <Nav />
        </div>
        <div className="banner">
          {/* <span onClick={toCourses} className="mobile-title-text">
                    Learning Levels
                    </span> */}
          <span className="back" style={{ textTransform: "capitalize" }}>
            <svg
              version="1.1"
              x="0px"
              y="0px"
              height="15"
              className="mr25"
              viewBox="0 0 512.005 512.005"
              onClick={openLevelsModal}
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
          <div className="small">
            <span>Possible points:</span>
            <p>{totalScore(selectedSubject.tests)}</p>
          </div>
          <div className="wide">
            <div className="progresses">
              {getTrailingScores().length ? (
                getTrailingScores().map((utest) => {
                  return (
                    <div key={utest.id} className="progress-wrap">
                      <ProgressBar />
                      <span>
                        {selectedSubject.tests &&
                          selectedSubject.tests.find(
                            (t) => t.id == utest.testId
                          ) &&
                          selectedSubject.tests.find(
                            (t) => t.id == utest.testId
                          ).year}
                        ({utest.score} study points)
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="progress-wrap">
                  <span>Start quizzes to acquire points</span>
                </div>
              )}
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
                    <p className="heading">Lesson Pack {i + 1}</p>
                    <div className="lessons-wrap mb30">
                      <div className="lessons">
                        {test.videos.length ? (
                          test.videos.map((video, i) => (
                            <Lesson
                              name={name}
                              disable={test.disable}
                              usertests={
                                usertests && usertests.length
                                  ? usertests.filter(
                                      (ut) => ut.testId === test.id
                                    )
                                  : []
                              }
                              uservideos={getUserVideos(usertests, test.id)}
                              key={"video" + video.id + "" + i}
                              usercourseid={usercourseid}
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
                        disable={test.disable}
                        usertests={
                          usertests && usertests.length
                            ? usertests.filter((ut) => ut.testId === test.id)
                            : []
                        }
                        userquizzes={getPreviousQuiz(
                          usertests &&
                            usertests.find((ut) => ut.testId === test.id),
                          test.quizzes,
                          test.level
                        )}
                        type="main"
                        usercourseid={usercourseid}
                        quizType="normal"
                        quiz={test.quizzes}
                      />
                    ) : null}
                  </React.Fragment>
                )
              )}

            {/* comment out levels (beginner, intermediate, advanced) on mobile screen  */}
            {/* <div className="mobile-screen lesson-padding">
              <div className="courses-wrap">
                <div className="courses">
                  <div className="flex-grid-thirds">
                    {selectedSubject &&
                      selectedSubject.tests &&
                      selectedSubject.tests.map((test, i) => (
                        <div
                          key={test.id}
                          onClick={() => pickLevel(test, i)}
                          style={{ textTransform: "uppercase" }}
                          className={`min__width bg_level course pLR level 
                                                                        ${
                                                                          testId ===
                                                                          test.id
                                                                            ? "active"
                                                                            : ""
                                                                        }`}
                        >
                          <span>{test.year}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div> */}
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
                  <button
                    onClick={user.isSubscribed ? gotoPacks : onSubscribe}
                    title={
                      user.isSubscribed
                        ? "Click to see advanced questions"
                        : "You need to be subscribed to view this."
                    }
                    className={`btn ${!user.isSubscribed ? "greyed" : ""}`}
                  >
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
