import React, { useState, useEffect } from "react";
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

export default function Quiz(props) {
  const [open, setopen] = useState(false);
  const [quizFromPack, setQuizFromPack] = useState([]);
  const [started, setStarted] = useState(false);
  const [finishedTest, setfinishedTest] = useState(false);
  const [scores, setScore] = useState({ score: 0, percent: 0, count: 0 });
  const [hour, setHr] = useState(0);
  const [minutes, setMin] = useState(0);
  const [openMobileQuiz, setopenMobileQuiz] = useState(false);

  const [modes, setModes] = useState([
    { text: "Learning Approach", selected: false },
    { text: "Time Mode", selected: false },
    { text: "Free Form Mode", selected: false },
  ]);

  useEffect(() => {
    if (props.quizType === "studypack") {
      authServices
        .getStudypackData(props.quizId)
        .then((res) => {
          setQuizFromPack(res.data);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, []);

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

  const onOpenModal = () => {
    if (!props.quiz) {
      return;
    }
    setopen(true);
    setModes(
      modes.map((mod) => {
        return {
          ...mod,
          selected: false,
        };
      })
    );
  };

  const onCloseModal = () => {
    setopen(false);
    setfinishedTest(false);
    setStarted(false);
  };

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
      selectedQuizMode ? setStarted(true) : console.log("select a mode");
    }
  };

  const handleClick = () => {
    if (!props.open) return;
    setopenMobileQuiz(true);
  };

  const logg = () => {
    console.log(props);
  };

  return (
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
            ? "There are no questions in this quiz. Chech back later"
            : "Click to take test"
        }
        className="blue-btn big-btn"
        onClick={onOpenModal}
      >
        Start Quiz
      </button>

      <button
        disabled={!props.quiz}
        title={
          !props.quiz
            ? "There are no questions in this quiz. Chech back later"
            : "Click to take test"
        }
        className="blue-btn sm-btn"
        onClick={handleClick}
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
            <div className={`left ${finishedTest ? "left2" : "left1"}`}>.</div>
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
                  Donec dapibus mauris id odio ornare tempus. Duis sit amet
                  accumsan justo, quis tempor ligula. Donec dapibus mauris id
                  odio ornare tempus.
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
                                This gives the option to view explanation for
                                each question
                              </div>
                            )}
                            {mode.selected && i === 1 && (
                              <div className="blue--text">
                                <p>
                                  This simulates exam environment with
                                  timing.You can generate your result and review
                                  questions afterwards
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
                  Thanks for taking the test
                </p>
                <div className="scores">
                  <h4>Your score:</h4>
                  <h2>
                    {scores.percent}% ({scores.score}/{scores.count} correct)
                  </h2>
                </div>
                <div className="scores">
                  <h4>Learning point</h4>
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
          // remember to make any change to this component to its sibling down this component
          <QuizQuestion
            selectedQuizMode={selectedQuizMode}
            onClose={onCloseModal}
            completeTest={completeTest}
            questions={props.quiz.length ? props.quiz : quizFromPack}
            time={{ hour, minutes }}
            quizType={props.quizType}
          />
        )}
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
                    Donec dapibus mauris id odio ornare tempus. Duis sit amet
                    accumsan justo, quis tempor ligula. Donec dapibus mauris id
                    odio ornare tempus.
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
                                  This gives the option to view explanation for
                                  each question
                                </div>
                              )}
                              {mode.selected && i === 1 && (
                                <div className="blue--text">
                                  <p>
                                    This simulates exam environment with
                                    timing.You can generate your result and
                                    review questions afterwards
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
                    Thanks for taking the test
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
                      {scores.percent}% ({scores.score}/{scores.count} correct)
                    </h2>
                  </div>
                  <div className="scores">
                    <h4>Learning point</h4>
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
              questions={props.quiz.length ? props.quiz : quizFromPack}
              time={{ hour, minutes }}
              quizType={props.quizType}
            />
          )}
        </div>
      )}
    </div>
  );
}
