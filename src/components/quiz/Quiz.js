import React, { useState, useEffect, useContext } from "react";
import "./Quiz.scss";

import dots from "../../assets/images/Dots.svg";
import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import twitter from "../../assets/images/twitter.svg";
import quizPic from "../../assets/images/Quiz-character.svg";
import close from "../../assets/images/close.svg";
import Modal from "react-responsive-modal";
import QuizQuestion from "../quiz-question/Quiz-question";
import authServices from "../../services/authServices";
import { userContext } from "../../store/UserContext";
import Loader from "../loader/Loader";

export default function Quiz(props) {
  const { updateStudyPackQuizes, quizzes, loading, updateLoader } = useContext(
    userContext
  );
  const [open, setopen] = useState(false);
  const [openSave, setopenSave] = useState(false);
  const [quizFromPack, setQuizFromPack] = useState([]);
  const [started, setStarted] = useState(false);
  const [finishedTest, setfinishedTest] = useState(false);
  const [scores, setScore] = useState({ score: 0, percent: 0, count: 0 });
  const [hour, setHr] = useState(0);
  const [minutes, setMin] = useState(0);
  const [openMobileQuiz, setopenMobileQuiz] = useState(false);

  const [modes, setModes] = useState([
    { text: "Learning Mode", selected: false },
    { text: "Time Mode", selected: false },
    { text: "Free Form Mode", selected: false },
  ]);

  // useEffect(() => {
  //   if (props.quizType === "studypack") {
  //     authServices
  //       .getStudypackData(props.quizId)
  //       .then((res) => {
  //         setQuizFromPack(res.data);
  //         updateStudyPackQuizes(res.data);
  //       })
  //       .catch((err) => {
  //         console.log({ err });
  //       });
  //   }
  // }, []);

  const selectMode = (i) => {
    setModes(
      modes.map((m, j) => {
        return i === j
          ? {
              ...m,
              selected: true,
            }
          : {
              ...m,
              selected: false,
            };
      })
    );
  };

  const selectedQuizMode = modes.find((m) => m.selected)
    ? modes.find((m) => m.selected).text
    : "";

  const onCloseModal = () => {
    setopen(false);
    setfinishedTest(false);
    setStarted(false);
    setopenSave(true);
  };

  const onCloseModal_ = () => {};

  const completeTest = (score) => {
    setfinishedTest(!finishedTest);
    setStarted(false);
    setScore(score);
  };

  const startQuiz = () => {
    if (props.quizType === "normal") {
      selectMode(2);
      setStarted(true);
    } else {
      console.log("quiz starting");
      setfinishedTest(false);
      selectedQuizMode ? setStarted(true) : console.log("select a mode");
    }
  };

  const onOpenModal = (n) => {
    if (!props.open && n === 2) return;
    if (props.quizType === "normal") {
      console.log("is normal");
      n === 1 ? setopen(true) : setopenMobileQuiz(true);
    } else {
      console.log("is quizpack");
      updateLoader(true);
      authServices
        .getStudypackData(props.quizId)
        .then((res) => {
          updateStudyPackQuizes(res.data);
          updateLoader(false);
          if (!res.data.length) {
            return;
          }
          n === 1 ? setopen(true) : setopenMobileQuiz(true);
          setModes(
            modes.map((mod) => {
              return {
                ...mod,
                selected: false,
              };
            })
          );
        })
        .catch((err) => {
          console.log({ err });
          updateLoader(false);
        });
    }
  };

  const logg = () => {
    console.log(props);
  };

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="quiz">
        <p className="quiz-heading" onClick={logg}>
          {props.name || "Quiz 1"}
        </p>
        <p className="sub-heading">
          {props.shortDescription ||
            "Level up on the above skills and collect up to 400 Mastery points"}
        </p>

        <button
          disabled={!props.quiz}
          title={
            !props.quiz
              ? "There are no questions in this quiz. Check back later"
              : "Click to take test"
          }
          className="blue-btn big-btn"
          onClick={() => onOpenModal(1)}
        >
          Start Quiz
        </button>

        <button
          disabled={!props.quiz}
          title={
            !props.quiz
              ? "There are no questions in this quiz. Check back later"
              : "Click to take test"
          }
          className="blue-btn sm-btn"
          onClick={() => onOpenModal(2)}
        >
          Start Quiz
        </button>

        <div className="patterns">
          <img src={dots} className="dots" alt="" />
          <img src={quizPic} className="pattern1" alt="" />
        </div>

        <Modal
          open={open}
          onClose={onCloseModal}
          styles={{ modal: { width: "98%" } }}
          center
          showCloseIcon={false}
          closeOnOverlayClick={false}
        >
          {!started ? (
            <div className="quiz-modal">
              <div className={`left ${finishedTest ? "left2" : "left1"}`}>
                .
              </div>
              {!finishedTest ? (
                <div className="right">
                  <p className="header">
                    {props.quizType === "normal"
                      ? "All set for the unit test?"
                      : "Please select a test approach"}
                    <span className="close">
                      <img
                        src={close}
                        alt=""
                        onClick={onCloseModal}
                        style={{
                          width: "20px",
                          float: "right",
                          marginTop: "-80px",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  </p>
                  <p className="desc" style={{ lineHeight: "24px" }}>
                    {props.quizType === "normal"
                      ? `Let us see how attentive you have been with your learning.
                    There are only very few questions here, and you can always
                    try again. Let's go!`
                      : `Click on the button to select a test approach to get started.`}
                  </p>
                  <div>
                    <div className="radios">
                      {props.quizType !== "normal" &&
                        modes.map((mode, i) => {
                          return (
                            <span key={mode.text} onClick={() => selectMode(i)}>
                              <input
                                type="radio"
                                name=""
                                id=""
                                onChange={() => selectMode(i)}
                                checked={mode.selected}
                              />{" "}
                              {mode.text}
                              {mode.selected && i === 0 && (
                                <div className="blue--text">
                                  This helps you learn better as you take each
                                  question. You get to see the answer and
                                  explanation of each question as you take the
                                  test
                                </div>
                              )}
                              {mode.selected && i === 1 && (
                                <div className="blue--text">
                                  <p>
                                    This simulates an examination environment
                                    without a timer. You get to take the test
                                    freely and at your own pace
                                  </p>
                                  <div>
                                    <span
                                      style={{
                                        position: "relative",
                                        top: "-26px",
                                        color: "#000",
                                      }}
                                    >
                                      Set time
                                    </span>
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      onChange={(e) => setHr(e.target.value)}
                                    />
                                    <span>Hrs</span>
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      onChange={(e) => setMin(e.target.value)}
                                    />
                                    <span>Mins</span>
                                  </div>
                                </div>
                              )}
                              {mode.selected && i === 2 && (
                                <div className="blue--text">
                                  This simulates exam environment without timing
                                </div>
                              )}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                  {props.quizType === "normal" && (
                    <p className="duration">
                      <span style={{ lineHeight: "50px" }}>
                        {props.quiz ? props.quiz.length : "0"} Questions{" "}
                      </span>{" "}
                      <br />
                      <span style={{ lineHeight: "50px" }}>
                        {props.quiz ? props.quiz.length * 0.5 : "0"} -{" "}
                        {props.quiz ? props.quiz.length * 0.75 : "0"} minutes
                      </span>
                    </p>
                  )}
                  <button className="tw-btn mt15" onClick={startQuiz}>
                    Lets get started
                  </button>
                </div>
              ) : (
                <div className="right">
                  <p className="header" style={{ marginTop: 90 }}>
                    Good job on taking the test!
                  </p>
                  <div className="scores">
                    <h4>Your score:</h4>
                    <h2>
                      {scores.percent}% ({scores.score}/{scores.count} correct)
                    </h2>
                  </div>
                  <div className="scores">
                    <h4>Learning points</h4>
                    <h2>80% ({0.8 * scores.count} Points)</h2>
                  </div>
                  <button className="tw-btn mt15" onClick={onCloseModal}>
                    Done
                  </button>

                  <div className="btm">
                    <p className="share">
                      <span>Share your result on</span>
                    </p>
                    <button className="fb-btn">
                      <img src={facebook} alt="" /> <span>Facebook</span>
                    </button>
                    <button className="tw-btn">
                      <img src={twitter} alt="" /> <span>Twitter</span>
                    </button>
                    <button className="gg-btn">
                      <img src={google} alt="" /> <span>Google</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // remember to make any change to this component to its sibling down this component
            <QuizQuestion
              selectedQuizMode={selectedQuizMode}
              onClose={onCloseModal}
              completeTest={completeTest}
              questions={props.quiz.length ? props.quiz : quizzes}
              time={{ hour, minutes }}
              quizType={props.quizType}
            />
          )}
        </Modal>

        <Modal
          open={openSave}
          onClose={onCloseModal_}
          styles={{ modal: { width: "50%" } }}
          center
          showCloseIcon={true}
          closeOnOverlayClick={true}
        >
          <div style={{ padding: 30, height: "320px" }}>
            <div style={{ textAlign: "center" }}>
              <img src={quizPic} style={{ width: "170px" }} alt="" />
              <p style={{ fontSize: "16px" }}>
                Do you want to save your score/progress?
              </p>
              <button
                className="gg-btn"
                style={{ padding: "0 30px", margin: "0 10px" }}
              >
                Cancel
              </button>
              <button className="tw-btn" style={{ padding: "0 30px" }}>
                Save
              </button>
            </div>
          </div>
        </Modal>

        {openMobileQuiz && (
          <div className="mobile-quiz">
            {!started ? (
              <div className="quiz-modal">
                {!finishedTest ? (
                  <div className="right">
                    <p className="header">
                      {props.quizType === "normal"
                        ? "All set for the unit test?"
                        : "Please select a test approach"}
                      <span className="close">
                        <img
                          src={close}
                          alt=""
                          onClick={() => setopenMobileQuiz(false)}
                          className="close-mobile-quiz"
                        />
                      </span>
                    </p>
                    <p className="desc" style={{ lineHeight: "24px" }}>
                      {props.quizType === "normal"
                        ? `Let us see how attentive you have been with your learning.
                    There are only very few questions here, and you can always
                    try again. Let's go!`
                        : `Click on the button to select a test approach to get started.`}
                    </p>
                    <div>
                      <div className="radios">
                        {props.quizType !== "normal" &&
                          modes.map((mode, i) => {
                            return (
                              <span
                                key={mode.text}
                                onClick={() => selectMode(i)}
                              >
                                <input
                                  type="radio"
                                  name=""
                                  id=""
                                  onChange={() => selectMode(i)}
                                  checked={mode.selected}
                                />{" "}
                                {mode.text}
                                {mode.selected && i === 0 && (
                                  <div className="blue--text">
                                    This helps you learn better as you get to
                                    see the explanation and answer after each
                                    question.
                                  </div>
                                )}
                                {mode.selected && i === 1 && (
                                  <div className="blue--text">
                                    <p>
                                      This simulates an examination environment
                                      without a timer. You get to take the test
                                      freely and at your own pace
                                    </p>
                                    <div>
                                      <span
                                        style={{
                                          position: "relative",
                                          top: "-26px",
                                          color: "#000",
                                        }}
                                      >
                                        Set time
                                      </span>
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        onChange={(e) => setHr(e.target.value)}
                                      />
                                      <span>Hrs</span>
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        onChange={(e) => setMin(e.target.value)}
                                      />
                                      <span>Mins</span>
                                    </div>
                                  </div>
                                )}
                                {mode.selected && i === 2 && (
                                  <div className="blue--text">
                                    This simulates exam environment without
                                    timing
                                  </div>
                                )}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                    {props.quizType === "normal" && (
                      <p className="duration">
                        <span style={{ lineHeight: "50px" }}>
                          {props.quiz ? props.quiz.length : "0"} Questions{" "}
                        </span>{" "}
                        <br />
                        <span style={{ lineHeight: "50px" }}>
                          {props.quiz ? props.quiz.length * 0.5 : "0"} -{" "}
                          {props.quiz ? props.quiz.length * 0.75 : "0"} minutes
                        </span>
                      </p>
                    )}
                    <button className="tw-btn mt15" onClick={startQuiz}>
                      Lets get started
                    </button>
                  </div>
                ) : (
                  <div className="right">
                    <p className="header" style={{ marginTop: 90 }}>
                      Good job on taking the test!
                      <span className="close">
                        <img
                          src={close}
                          alt=""
                          onClick={() => setopenMobileQuiz(false)}
                          className="close-mobile-quiz"
                        />
                      </span>
                    </p>
                    <div className="scores">
                      <h4>Your score:</h4>
                      <h2>
                        {scores.percent}% ({scores.score}/{scores.count}{" "}
                        correct)
                      </h2>
                    </div>
                    <div className="scores">
                      <h4>Learning points</h4>
                      <h2>80% (400 Points)</h2>
                    </div>
                    <button className="tw-btn mt15" onClick={onCloseModal}>
                      Done
                    </button>

                    <div className="btm">
                      <p className="share">
                        <span>Share your result on</span>
                      </p>
                      <button className="fb-btn">
                        <img src={facebook} alt="" /> <span>Facebook</span>
                      </button>
                      <button className="tw-btn">
                        <img src={twitter} alt="" /> <span>Twitter</span>
                      </button>
                      <button className="gg-btn">
                        <img src={google} alt="" /> <span>Google</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // remember to make any change to this component to its sibling up this component
              <QuizQuestion
                selectedQuizMode={selectedQuizMode}
                onClose={onCloseModal}
                completeTest={completeTest}
                questions={props.quiz.length ? props.quiz : quizzes}
                time={{ hour, minutes }}
                quizType={props.quizType}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
