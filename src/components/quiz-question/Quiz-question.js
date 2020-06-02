import React, { useState } from "react";
import "./Quiz-question.scss";
import ProgressBar from "../progress-bar/ProgressBar";
import close from "../../assets/images/close.svg";
import caret from "../../assets/images/down-arrow.svg";

export default function QuizQuestion(props) {
  const [passage, setpassage] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const { selectedQuizMode } = props;

  const [options, setoptions] = useState([
    { option: "A", text: "this is the first option", picked: false },
    { option: "B", text: "this is the second option", picked: false },
    { option: "C", text: "this is the third option", picked: false },
    { option: "D", text: "this is the forth option", picked: false },
  ]);

  const pickAnswer = (i) => {
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

  const pickedClassName =
    selectedQuizMode === "Learning Approach" ? "correct_" : "correct";

  return (
    <div className="quiz-quuestion">
      <div className="upper">
        <div style={{ position: "relative" }}>
          <p className="instruction">
            Answer question 1 to 5 with the passage
            {selectedQuizMode === "Time Mode" && (
              <span
                className=""
                style={{
                  width: "20px",
                  position: "absolute",
                  right: "50px",
                  top: "-30px",
                  minWidth: "210px",
                  cursor: "pointer",
                  fontSize: "36px",
                  backgroundColor: "#F8F8F8",
                  textAlign: "center",
                  padding: "5px",
                }}
              >
                1: 30: 25
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
                  marginTop: "-15px",
                  cursor: "pointer",
                }}
              />
            </span>
          </p>
          <ProgressBar />
        </div>
        <div className="content">
          <p className="question">
            Musa has a choice of buying a shirt and a bag. What is the
            opportunity cost of buying a book Musa has a choice of buying a
            shirt and a bag. What is the opportunity cost of buying a book Musa
            has a choice of buying a shirt and a bag. What is the opportunity
            cost of buying a book?
          </p>

          {options.map((option, i) => {
            return (
              <div
                className={`answer ${option.picked ? pickedClassName : ""}`}
                onClick={() => pickAnswer(i)}
              >
                <span className="label">{option.option}</span>
                <p>{option.text}</p>
                {selectedQuizMode !== "Learning Approach" && (
                  <h4 className="caveat">correct answer</h4>
                )}
              </div>
            );
          })}

          <p className="feedback blue--text" onClick={() => openFeedback()}>
            <em>Feedback</em>
          </p>
        </div>
        {passage && (
          <div className="passage">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
            sapiente dolore mollitia harum. Laboriosam nobis eaque recusandae
            tempore porro quibusdam rerum saepe nihil, doloribus culpa corrupti
            fugiat quia labore nostrum? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Quasi sapiente dolore mollitia harum. Laboriosam
            nobis eaque recusandae tempore porro quibusdam rerum saepe nihil,
            doloribus culpa corrupti fugiat quia labore nostrum? Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Quasi sapiente dolore
            mollitia harum. Laboriosam nobis eaque recusandae tempore porro
            quibusdam rerum saepe nihil, doloribus culpa corrupti fugiat quia
            labore nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum?
          </div>
        )}
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
      <div className="footer">
        <b>
          <img
            src={caret}
            width="12"
            alt=""
            style={{
              transform: "rotate(90deg)",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
          4 of 10
          <img
            src={caret}
            width="12"
            alt=""
            style={{
              transform: "rotate(-90deg)",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
        </b>
        <button
          className="tw-btn"
          onClick={() => props.completeTest()}
          style={{ marginLeft: 20 }}
        >
          SUBMIT
        </button>
        <button className="blue-btn" onClick={() => openPassage()}>
          {passage ? "Close passage" : "Open passage"}
        </button>
      </div>
    </div>
  );
}
