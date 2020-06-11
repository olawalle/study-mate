import React, { useState, useEffect } from "react";
import "./Quiz-question.scss";
import ProgressBar from "../progress-bar/ProgressBar";
import close from "../../assets/images/close.svg";
import streak from "../../assets/images/repeat.svg";
import caret from "../../assets/images/down-arrow.svg";

export default function QuizQuestion(props) {
  let hr = props.time ? parseFloat(props.time.hour) * 60 : 0;
  let min = parseFloat(props.time.minutes);
  let duration_ = (hr + min) * 60;

  const [passage, setpassage] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [answered, setanswered] = useState(false);
  const [wrongAnswer, setwrongAnswer] = useState(false);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [duration, setduration] = useState(duration_);
  const [answers, setanswers] = useState([]);
  const [remains, setremains] = useState({ hr: 0, min: 0, sec: 0 });
  const [optionSelected, setoptionSelected] = useState(false);
  const [attempts, setattempts] = useState(0);
  const [showAlert, setshowAlert] = useState(true);
  const [showExplanation, setshowExplanation] = useState(false);
  const { selectedQuizMode, questions } = props;
  let activeQuestion = questions[currentQuestion];

  const [options, setoptions] = useState([]);

  useEffect(() => {
    getOptions(0);
    const timer = window.setInterval(() => {
      setduration((prevTime) => {
        let dur = prevTime - 1;
        if (prevTime > 0) {
          let hoursRemaining = dur > 3600 ? Math.floor(dur / 3600) : 0;
          let minutesRemaining = Math.floor(dur / 60 - 60 * hoursRemaining);
          let secondsRemaining =
            dur - (hoursRemaining * 3600 + minutesRemaining * 60);
          let data = {
            hr: hoursRemaining,
            min:
              minutesRemaining >= 10
                ? minutesRemaining
                : `0${minutesRemaining}`,
            sec:
              secondsRemaining >= 10
                ? secondsRemaining
                : `0${secondsRemaining}`,
          };
          setremains(data);
        } else {
          if (selectedQuizMode === "Time Mode") submit();
        }
        return dur;
      });
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const nextQuestion = () => {
    let no = currentQuestion + 1;
    setcurrentQuestion(no);
    getOptions(no);
    setanswered(false);
    setwrongAnswer(false);
    setoptionSelected(false);
    btnText();
    !answers[no] && setattempts(0);
  };

  const prevQuestion = () => {
    let no = currentQuestion - 1;
    setcurrentQuestion(no);
    getOptions(no);
    setanswered(false);
    setwrongAnswer(false);
    setoptionSelected(false);
    btnText();
    !answers[no] && setattempts(0);
  };

  const pickAnswer = (i) => {
    if (attempts > 1 || showExplanation) return;
    if (selectedQuizMode === "Learning Approach" && attempts < 2) {
      setattempts(attempts + 1);
      let correctlyAnswered = options[i].id !== activeQuestion.answerId;
      setwrongAnswer(correctlyAnswered);
      !correctlyAnswered && setshowAlert(true);
    }
    setoptionSelected(true);

    setanswered(true);
    let prevAnswers = [...answers];
    prevAnswers[currentQuestion] = options[i].id;
    setanswers(prevAnswers);
    setoptions(
      options.map((option, j) => {
        return i === j
          ? {
              ...option,
              picked: true,
            }
          : {
              ...option,
              picked: false,
            };
      })
    );
  };

  const openPassage = () => {
    setpassage(true);
    setFeedback(false);
  };

  const openFeedback = () => {
    setpassage(false);
    setFeedback(!feedback);
  };

  const getOptions = (no) => {
    if (no >= questions.length) {
      submit();
      return;
    }
    let previouslyAnswered = [...answers][no];
    let options = questions[no].options.map((option, i) => {
      return {
        ...option,
        text: option.content,
        picked:
          previouslyAnswered && previouslyAnswered === option.id ? true : false,
        option: i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : "D",
      };
    });
    setoptions(options);
  };

  const submit = () => {
    let defaultAnswers = questions.map((q) => q.answerId);
    let score = 0;

    answers.forEach((ans, i) => {
      if (ans === defaultAnswers[i]) score += 1;
    });
    let count = questions.length;
    let percent = (score * 100) / count;
    setcurrentQuestion(0);
    props.completeTest({ score, percent, count });
  };

  const submitLearingAnswer = () => {
    if (answers.length === questions.length || showExplanation) {
      submit();
      return;
    }
    setwrongAnswer(false);
    if (attempts < 2 && wrongAnswer) {
      setshowAlert(false);
    } else {
      nextQuestion();
    }
  };

  const getClass = (option) => {
    if (
      option.picked &&
      option.id === activeQuestion.answerId &&
      showExplanation
    )
      return "correct";
    if (option.picked && selectedQuizMode !== "Learning Approach") {
      return `correct`;
    } else {
      if (option.picked && option.id === activeQuestion.answerId) {
        return `correct_`;
      } else if (option.picked && option.id !== activeQuestion.answerId) {
        return "wrong";
      }
    }
  };

  const viewExplanation = () => {
    setshowExplanation(true);
  };

  const btnText = () => {
    if (
      answers.length === questions.length ||
      (!optionSelected && !wrongAnswer)
    )
      return "SUBMIT";
    if (wrongAnswer && attempts === 1) return "TRY AGAIN";
    else return "NEXT QUESTION";
  };

  return (
    <div className="quiz-quuestion">
      <div className="upper">
        <div style={{ position: "relative" }}>
          <div className="instruction">
            Answer question 1 to 5 with the passage{" "}
            {selectedQuizMode === "Time Mode" && (
              <span className="time">
                {remains.hr}: {remains.min}: {remains.sec}
              </span>
            )}
            <span className="close">
              <img
                src={close}
                alt=""
                onClick={() => props.onClose()}
                style={{
                  width: "20px",
                  float: "right",
                  marginTop: "-5px",
                  cursor: "pointer",
                }}
              />
            </span>
            {attempts === 1 && showAlert && wrongAnswer && (
              <div className="alert">
                <img src={streak} className="badge" alt="" />
                <div className="streak-text">
                  <p className="top">
                    Not quite yet ...
                    <img
                      src={close}
                      alt=""
                      onClick={() => setshowAlert(false)}
                      className="ex"
                    />
                  </p>
                  <p style={{ fontSize: 10 }}>
                    Your answer is incorrect. Try again
                  </p>
                  <p style={{ fontSize: 12 }}>
                    <span
                      className="blue--text"
                      onClick={viewExplanation}
                      style={{ fontSize: 14, fontWeight: 600 }}
                    >
                      View explanation
                    </span>{" "}
                    or{" "}
                    <span
                      className="blue--text"
                      onClick={nextQuestion}
                      style={{ fontSize: 14, fontWeight: 600 }}
                    >
                      Move on
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <ProgressBar width={currentQuestion / (questions.length - 1)} />
        </div>
        <div className="content">
          <p className="question">{activeQuestion.question}</p>
          <div className="questions">
            {options.map((option, i) => {
              return (
                <div
                  key={option.text}
                  className={`answer ${getClass(option)} ${
                    showExplanation && option.id === activeQuestion.answerId
                      ? "correct"
                      : ""
                  }`}
                  onClick={() => pickAnswer(i)}
                >
                  <span className="label">{option.option}</span>
                  <p>
                    {option.text} - {option.id} - {activeQuestion.answerId}{" "}
                    <br />
                    {showExplanation && option.id === activeQuestion.answerId && (
                      <span
                        style={{
                          fontSize: 14,
                          color: "#afafaf",
                          position: "relative",
                          top: "10px",
                        }}
                      >
                        this answer is wring this answer is wring this answer is
                        wring this answer is wring this answer is wring this
                        answer is wring this answer is wring this answer is
                        wring this answer is wring this answer is wring this
                        answer is wring this answer is wring this answer is
                        wring this answer is wring this answer is wring this
                        answer is wring this answer is wring this answer is
                        wring this answer is wring this answer is wring this
                        answer is wring this answer is wring this answer is
                        wring this answer is wring
                      </span>
                    )}
                  </p>
                  {/* {selectedQuizMode !== "Learning Approach" &&
                  answered &&
                  option.id === activeQuestion.answerId && (
                    <h4 className="caveat">correct answer</h4>
                  )} */}
                  {selectedQuizMode === "Learning Approach" &&
                    answered &&
                    attempts === 2 &&
                    !showExplanation &&
                    option.id === activeQuestion.answerId && (
                      <h4 className="caveat">correct answer</h4>
                    )}

                  {selectedQuizMode === "Learning Approach" &&
                    answered &&
                    option.id !== activeQuestion.answerId &&
                    option.picked && (
                      <h4 className="caveat">Incorrect answer</h4>
                    )}
                </div>
              );
            })}
          </div>

          {!showExplanation && (
            <p className="feedback blue--text" onClick={() => openFeedback()}>
              <em>Feedback</em>
            </p>
          )}
        </div>
        {passage && <div className="passage">{activeQuestion.passage}</div>}
        {feedback && (
          <div className="passage formm">
            <p className="top">Report a mistake in this question</p>
            <span className="sub">Thanks for your help! What’s wrong?</span>

            <form>
              <span className="radio mt30">
                <input type="radio" name="type" id="" />
                The answer is wrong
              </span>
              <span className="radio">
                <input type="radio" name="type" id="" />I caught a typo
              </span>
              <span className="radio">
                <input type="radio" name="type" id="" />
                The question or hit are confusing
              </span>
              <span className="radio">
                <input type="radio" name="type" id="" />
                The image is not clear
              </span>
            </form>

            <p className="sub">
              Alternatively, you can report any technical problems you may be
              experiencing.
            </p>

            <span className="sub">Description of issue:</span>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button className="tw-btn">Submit issue</button>
            <span onClick={openFeedback} className="cancel">
              Cancel
            </span>
          </div>
        )}
      </div>

      {selectedQuizMode === "Learning Approach" ? (
        <div className="footer">
          <b
            style={{
              position: "relative",
              top: 13,
            }}
          >
            {currentQuestion > 0 && (
              <img
                src={caret}
                width="12"
                alt=""
                style={{
                  transform: "rotate(90deg)",
                  marginRight: "10px",
                }}
              />
            )}
            {currentQuestion + 1} of {questions.length}
            {currentQuestion < questions.length - 1 && (
              <img
                src={caret}
                width="12"
                alt=""
                style={{
                  transform: "rotate(-90deg)",
                  marginLeft: "10px",
                }}
              />
            )}
          </b>

          <button
            className="tw-btn"
            onClick={() => submitLearingAnswer()}
            style={{ marginLeft: 20 }}
          >
            {btnText()}
          </button>
        </div>
      ) : (
        <div className="footer">
          <b
            style={{
              position: "relative",
              top: 13,
            }}
          >
            {currentQuestion > 0 && (
              <img
                src={caret}
                width="12"
                alt=""
                style={{
                  transform: "rotate(90deg)",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={prevQuestion}
              />
            )}
            {currentQuestion + 1} of {questions.length}
            {currentQuestion < questions.length - 1 && (
              <img
                src={caret}
                width="12"
                alt=""
                style={{
                  transform: "rotate(-90deg)",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={nextQuestion}
              />
            )}
          </b>
          {currentQuestion === questions.length - 1 && (
            <button
              className="tw-btn"
              onClick={() => submit()}
              style={{ marginLeft: 20 }}
            >
              SUBMIT
            </button>
          )}

          {currentQuestion < questions.length - 1 && (
            <button
              className="blue-btn"
              onClick={nextQuestion}
              style={{ marginLeft: 20 }}
            >
              NEXT
            </button>
          )}

          {currentQuestion > 0 && (
            <button
              className="bare-btn"
              onClick={prevQuestion}
              style={{ marginLeft: 20 }}
            >
              PREVIOUS
            </button>
          )}
          {activeQuestion.hasPassage && (
            <button className="blue-btn" onClick={() => openPassage()}>
              {passage ? "Close passage" : "Open passage"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
