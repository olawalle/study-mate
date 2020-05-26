import React, { useState } from "react";
import "./Quiz.scss";

import dots from "../../assets/images/Dots.svg";
import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import twitter from "../../assets/images/twitter.svg";
import quizPic from "../../assets/images/Quiz-character.svg";
import Modal from "react-responsive-modal";
import QuizQuestion from "../quiz-question/Quiz-question";

export default function Quiz() {
  const [open, setopen] = useState(false);
  const [started, setStarted] = useState(false);
  const [finishedTest, setfinishedTest] = useState(false);

  const onOpenModal = () => {
    setopen(true);
  };

  const onCloseModal = () => {
    setopen(false);
    setfinishedTest(false);
    setStarted(false);
  };

  const completeTest = () => {
    console.log("submitted");
    setfinishedTest(!finishedTest);
    setStarted(false);
  };

  return (
    <div className="quiz">
      <p className="quiz-heading">Quiz 1</p>
      <p className="sub-heading">
        Level up on the above skills and collect up to 400 Mastery points
      </p>

      <button className="blue-btn" onClick={onOpenModal}>
        Resume Quiz
      </button>

      <div className="patterns">
        <img src={dots} className="dots" alt="" />
        <img src={quizPic} className="pattern1" alt="" />
      </div>

      <Modal open={open} onClose={onCloseModal} center showCloseIcon={false}>
        {!started ? (
          <div className="quiz-modal">
            <div className="left">.</div>
            {!finishedTest ? (
              <div className="right">
                <p className="header">All set for the unit test?</p>
                <p className="desc">
                  Donec dapibus mauris id odio ornare tempus. Duis sit amet
                  accumsan justo, quis tempor ligula. Donec dapibus mauris id
                  odio ornare tempus.
                </p>
                <p className="duration">
                  <span>10 Questions </span> <br />
                  <span>9 - 12 minutes</span>
                </p>
                <button
                  className="blue-btn mt15"
                  onClick={() => setStarted(true)}
                >
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
                  <h2>4% (3/10 correct)</h2>
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
          <QuizQuestion completeTest={completeTest} />
        )}
      </Modal>
    </div>
  );
}
