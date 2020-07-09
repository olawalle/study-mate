import React, { useContext, useEffect } from "react";
import { userContext } from "../../store/UserContext";

import "./Courses.scss";
import neww from "../../assets/images/New.svg";
import authServices from "../../services/authServices";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import Modal from "react-responsive-modal";

export default withRouter(function Courses(props) {
  const context = useContext(userContext);
  const {
    userCourses,
    updateLoader,
    selectedSubject,
    saveSelectedSubject,
    user,
  } = context;
  const [openLevels, setopenLevels] = useState(false);
  const [levels, setLevels] = useState([
    "Beginner",
    "Intermediate",
    "Advanced",
  ]);
  const [selectedIndex, setselectedIndex] = useState(null);

  const onCloseLevelsModal = () => {
    setopenLevels(false);
  };

  let sortesubjects = userCourses
    .map((subject, i) => {
      return {
        ...subject,
        width:
          subject.course.name.length <= 7
            ? 1
            : subject.course.name.length > 7 && subject.course.name.length <= 12
            ? 2
            : 3,
        new: false,
      };
    })
    .filter((c) =>
      user.level === 4
        ? c.course.studyLevel === 0 || c.course.studyLevel === user.level
        : c.course.studyLevel === user.level
    )
    .sort((a, b) => {
      if (a.width < b.width) return -1;
      if (a.width > b.width) return 1;
      return 0;
    });

  const selectCourse = (course) => {
    updateLoader(true);
    authServices
      .getSubjectQuiz(course.courseId)
      .then((res) => {
        saveSelectedSubject(res.data);
        updateLoader(false);
        if (props.dontMove) return;
        if (props.fromMobile) {
          setopenLevels(true);
          return;
        }
        props.moveToCourse && !props.toPreview
          ? props.history.push(`/subject/${selectedSubject.name}/Beginner`)
          : props.history.push(`/preview-subject/${selectedSubject.id}`);
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
  };

  const goToSubject = () => {
    let i = selectedIndex;
    let level = i === 0 ? "Beginner" : i === 1 ? "Intermediate" : "Advanced";
    props.history.push(`/subject/${selectedSubject.name}/${level}`);
  };

  useEffect(() => {
    sortesubjects.length &&
      !selectedSubject.name &&
      selectCourse(sortesubjects[0]);
  }, []);

  return (
    <div className="courses-wrap">
      <div className="courses">
        <div className="flex-grid-thirds">
          {sortesubjects.map((course, i) => {
            return (
              <div
                key={course.name + i}
                onClick={() => selectCourse(course)}
                style={{ textTransform: "uppercase" }}
                className={`bg_${(i % 17) + 2} ${
                  course.width === 1
                    ? "small"
                    : course.width === 2
                    ? "mid"
                    : "wide"
                } 
                ${i > 1 && !user.isSubscribed ? "greyed" : ""}
                course pLR`}
              >
                {course.course.name}{" "}
                {course.new && <img src={neww} className="new" alt="" />}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={props.onOpenModal} className="mt25 tw-btn">
        <b>Add more courses +</b>
      </button>

      <Modal
        open={openLevels}
        onClose={onCloseLevelsModal}
        center
        closeOnOverlayClick={true}
      >
        <div className="levels-modal">
          <p className="blue--text">Select User Type</p>
          <div className="levels">
            {levels.map((level, i) => {
              return (
                <div
                  onClick={() => setselectedIndex(i)}
                  className={`level bordered ${
                    i === selectedIndex ? "selected" : ""
                  }`}
                >
                  {level}
                </div>
              );
            })}
          </div>
          <div className="btn">
            <button className="tw-btn" onClick={goToSubject}>
              Start Learning
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});
