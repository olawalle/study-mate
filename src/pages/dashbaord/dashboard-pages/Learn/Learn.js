import React, { useEffect, useState, useContext } from "react";
import "./Learn.scss";

import Badges from "../../../../components/badges/Badges";
import { motion } from "framer-motion";

import play from "../../../../assets/images/play.svg";
import banner1 from "../../../../assets/images/banner1.svg";
import banner2 from "../../../../assets/images/Subjects.svg";
import students from "../../../../assets/images/students.png";
import Quiz from "../../../../components/quiz/Quiz";
import Courses from "../../../../components/courses/Courses";
import Lesson from "../../../../components/lesson/Lesson";
import Modal from "react-responsive-modal";
import { withRouter } from "react-router-dom";
import Links from "../../../../components/sidebar/Links";
import { userContext } from "../../../../store/UserContext";
import authServices from "../../../../services/authServices";

export default withRouter(function Learn({ history }) {
  const context = useContext(userContext);
  const {
    userCourses,
    subjects,
    user,
    updateUserCourses,
    selectedSubject,
  } = context;
  const [open, setopen] = useState(false);
  const [verified, setverified] = useState(true);
  const [level, setlevel] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    !userCourses.length && setopen(true);
  }, []);

  const onOpenModal = () => {
    setopen(true);
  };

  const onCloseModal = () => {
    setopen(false);
  };

  const jumpStep = () => {
    step < 2 ? setStep(step + 1) : setopen(false);
  };

  const toSubject = () => {
    history.push(`/subject/${selectedSubject.id}`);
  };

  const selectCourse = (course) => {
    authServices
      .updateUserCourses({
        userId: user.id,
        learnCourseId: course.id,
      })
      .then((res) => {
        console.log(res);
        authServices
          .getUserCourses()
          .then((res) => {
            console.log(res);
            updateUserCourses(res.data);
          })
          .catch((err) => {
            console.log({ err });
          });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const updateLevel = (level) => {
    setlevel(level);
    let data = [
      {
        value: level === 1 ? "junior" : "senior",
        op: "add",
        path: "/level",
      },
    ];

    authServices
      .updateUserData(data, user.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const logg = () => {
    console.log(selectedSubject);
  };

  return (
    <motion.div
      className="learn"
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw" }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="links-wrap">
        <Links />
      </div>

      {!verified && (
        <div className="verify">
          Please edit your profile to complete your registeration
          <button>EDIT PROFILE</button>
        </div>
      )}
      {userCourses.length ? (
        <div className="wide-side">
          <p className="heading">{selectedSubject.name}</p>
          <div className="lessons-wrap">
            <p className="sub-heading">
              Section A
              <button className="tw-btn f-right" onClick={toSubject}>
                Start learning
              </button>
            </p>

            <div className="lessons">
              {selectedSubject &&
                selectedSubject.videos.length &&
                selectedSubject.videos.map((video) => (
                  <Lesson video={video} disableClick={true} />
                ))}
            </div>
          </div>

          <div className="quizzes mt30">
            {selectedSubject &&
            selectedSubject.quizzes &&
            selectedSubject.quizzes.length ? (
              <Quiz quiz={selectedSubject.quizzes} />
            ) : null}
          </div>
        </div>
      ) : (
        <div
          className="wide-side"
          style={{
            background: "#fff",
            height: 400,
            textAlign: "center",
            paddingTop: 130,
          }}
        >
          <p className="blue--text">Select a course to start learning</p>
        </div>
      )}
      <div className="narrow-side">
        <div className="badge-wrap">
          <Badges />
        </div>

        <div className="courses">
          <Courses onOpenModal={onOpenModal} className="mt20" />
        </div>

        <img src={students} className="students" alt="" />

        <Modal
          open={open}
          onClose={onCloseModal}
          center
          styles={{ modal: { width: "60%" } }}
        >
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

              <button className="class bg_1" onClick={() => updateLevel(1)}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => updateLevel(1)}
                  checked={level === 1}
                />
                Junior Secondary
              </button>

              <button className="class bg_2" onClick={() => updateLevel(2)}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => updateLevel(1)}
                  checked={level === 2}
                />
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
                    onClick={() => selectCourse(subject)}
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
    </motion.div>
  );
});
