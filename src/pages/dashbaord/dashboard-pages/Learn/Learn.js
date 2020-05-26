import React, { useEffect, useState } from "react";
import "./Learn.scss";

import Badges from "../../../../components/badges/Badges";

import play from "../../../../assets/images/play.svg";
import banner1 from "../../../../assets/images/banner1.svg";
import banner2 from "../../../../assets/images/Subjects.svg";
import Quiz from "../../../../components/quiz/Quiz";
import Courses from "../../../../components/courses/Courses";
import Lesson from "../../../../components/lesson/Lesson";
import Modal from "react-responsive-modal";
import { withRouter } from "react-router-dom";

export default withRouter(function Learn({ subjects, history }) {
  const [open, setopen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    onOpenModal();
  }, []);

  const onOpenModal = () => {
    setopen(true);
  };

  const onCloseModal = () => {
    setopen(false);
  };

  const jumpStep = () => {
    setStep(step + 1);
  };

  const toSubject = () => {
    history.push("/subject/mathematics");
  };

  return (
    <div className="learn">
      <div className="wide-side">
        <p className="heading">Learning Statistics</p>
        <div className="lessons-wrap">
          <p className="sub-heading">
            Section A
            <button className="tw-btn f-right" onClick={toSubject}>
              Start learning
            </button>
          </p>

          <div className="lessons mt10">
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
            <Lesson />
          </div>
        </div>

        <div className="quizzes mt30">
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
        </div>
      </div>
      <div className="narrow-side">
        <Badges />

        <div className="courses">
          <Courses onOpenModal={onOpenModal} className="mt20" />
        </div>

        <Modal open={open} onClose={onCloseModal} center>
          <div
            className="banner"
            style={{
              backgroundImage:
                step === 1 ? `url(${banner1})` : `url(${banner2})`,
            }}
          >
            <p className="main-text">
              Let us help you personalize your learning
            </p>
            <p className="sub-text">
              {step === 1
                ? "What grade are you in?"
                : "What courses can we help you learn?"}
            </p>
          </div>
          {step === 1 ? (
            <div className="modal-data">
              <p className="blue--text">Secondary / High school</p>

              <button className="class bg_1">
                <input type="checkbox" name="" id="" />
                Junior Secondary
              </button>

              <button className="class bg_2">
                <input type="checkbox" name="" id="" />
                Senior Secondary
              </button>

              <div className="coming">
                <em>coming soon</em>
                <p className="blue--text">Primary / Elementary</p>
                <p className="blue--text">University / Adult learner</p>
              </div>
            </div>
          ) : (
            <div className="modal-data">
              {subjects.map((subject, i) => {
                return (
                  <button
                    className={`subject bg_${i + 1}`}
                    key={`subject-${subject.name}`}
                  >
                    <input type="checkbox" name="" id="" />
                    {subject.name}
                  </button>
                );
              })}
            </div>
          )}
          <div className="modal-footer">
            {step === 2 && (
              <em
                style={{ cursor: "pointer" }}
                className="f-left blue--text"
                onClick={() => setStep(1)}
              >
                Select learning grade
              </em>
            )}
            <button className="tw-btn" onClick={jumpStep}>
              {step === 1 ? "NEXT" : "Start Learning"}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
});
