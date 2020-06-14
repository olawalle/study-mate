import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../store/UserContext";
import authServices from "../../services/authServices";
import Modal from "react-responsive-modal";
import banner1 from "../../assets/images/banner1.svg";
import banner2 from "../../assets/images/Subjects.svg";

export default function AddCourses(props) {
  const context = useContext(userContext);
  const { userCourses, subjects, user, updateUserCourses } = context;
  const { open, onCloseModal } = props;
  const [subjects_, setsubjects_] = useState([]);
  const [level, setlevel] = useState(null);
  const [newSelectedCourses, setnewSelectedCourses] = useState([]);
  const [toBeRemoved, settoBeRemoved] = useState([]);
  const [step, setStep] = useState(1);
  let modalWidth = window.innerWidth > 1024 ? 98 : 100;

  const preSelectedCourses = userCourses.reduce((agg, curr) => {
    agg[curr.learnCourseId] = curr;
    return agg;
  }, {});

  useEffect(() => {
    let refinedSubjects = subjects.map((s) => {
      return {
        ...s,
        preSelected: preSelectedCourses[s.id] ? true : false,
      };
    });
    setsubjects_(refinedSubjects);
  }, []);

  const jumpStep = () => {
    step < 2 ? setStep(step + 1) : selectCourse();
  };

  const selectCourse = () => {
    console.log(newSelectedCourses, toBeRemoved);
    newSelectedCourses.forEach((id) => {
      authServices
        .updateUserCourses({
          userId: user.id,
          learnCourseId: id,
        })
        .then((res) => {
          console.log(res);
          authServices
            .getUserCourses(null, user.id)
            .then((res) => {
              onCloseModal();
              let user_courses = res.data.userLearnCourses;
              let sievedCourses = Object.values(
                user_courses.reduce((agg, curr) => {
                  agg[curr.learnCourseId] = curr;
                  return agg;
                }, {})
              );
              updateUserCourses(sievedCourses);
            })
            .catch((err) => {
              console.log({ err });
            });
        })
        .catch((err) => {
          console.log({ err });
        });
    });

    toBeRemoved.forEach((id) => {
      authServices
        .deleteUserCourse(id)
        .then((res) => {
          authServices
            .getUserCourses(null, user.id)
            .then((res) => {
              onCloseModal();
              let user_courses = res.data.userLearnCourses;
              let sievedCourses = Object.values(
                user_courses.reduce((agg, curr) => {
                  agg[curr.learnCourseId] = curr;
                  return agg;
                }, {})
              );
              updateUserCourses(sievedCourses);
            })
            .catch((err) => {
              console.log({ err });
            });
        })
        .catch((err) => {
          console.log({ err });
        });
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

  const pickSubject = (i) => {
    let subject = subjects_[i];
    if (subject.preSelected) {
      settoBeRemoved([...toBeRemoved, subject.id]);
      setnewSelectedCourses(
        [...newSelectedCourses].filter((n) => n !== subject.id)
      );
    } else {
      setnewSelectedCourses([...newSelectedCourses, subject.id]);
      settoBeRemoved([...toBeRemoved].filter((n) => n !== subject.id));
    }
    let newSubjectArr = subjects_.map((sub, j) => {
      return i === j
        ? {
            ...sub,
            preSelected: !sub.preSelected,
          }
        : { ...sub };
    });
    setsubjects_(newSubjectArr);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{ modal: { width: `${modalWidth}%` } }}
        closeOnOverlayClick={false}
      >
        <div
          className="banner"
          style={{
            backgroundImage: step === 1 ? `url(${banner1})` : `url(${banner2})`,
          }}
        >
          <p className="main-text">Let us help you personalize your learning</p>
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
            {subjects_.map((subject, i) => {
              return (
                <button
                  className={`subject bg_${i + 1}`}
                  onClick={() => pickSubject(i)}
                  key={`subject-${subject.name}`}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    style={{ transform: "scale(1.02)" }}
                    checked={subject.preSelected}
                    onChange={() => pickSubject(i)}
                  />
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
  );
}
