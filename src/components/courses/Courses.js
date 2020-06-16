import React, { useContext, useEffect } from "react";
import { userContext } from "../../store/UserContext";

import "./Courses.scss";
import neww from "../../assets/images/New.svg";
import authServices from "../../services/authServices";
import { withRouter } from "react-router-dom";

export default withRouter(function Courses(props) {
  const context = useContext(userContext);
  const {
    userCourses,
    updateLoader,
    selectedSubject,
    saveSelectedSubject,
    user,
  } = context;
  let sortesubjects = userCourses
    .map((subject, i) => {
      return {
        ...subject,
        width:
          subject.learnCourse.name.length <= 7
            ? 1
            : subject.name.length > 7 && subject.name.length <= 13
            ? 2
            : 3,
        new: false,
      };
    })
    .filter((c) => c.learnCourse.studyLevel === user.level)
    .sort((a, b) => {
      if (a.width < b.width) return -1;
      if (a.width > b.width) return 1;
      return 0;
    });

  const selectCourse = (course) => {
    console.log(course);
    updateLoader(true);
    authServices
      .getSubjectQuiz(course.learnCourseId)
      .then((res) => {
        saveSelectedSubject(res.data);
        updateLoader(false);
        props.moveToCourse &&
          props.history.push(`/subject/${selectedSubject.id}`);
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
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
                style={{ textTransform: "capitalize" }}
                className={`bg_${(i % 17) + 2} course ${
                  course.width === 3
                    ? "wide"
                    : course.width === 2
                    ? "mid"
                    : "small"
                }`}
              >
                {course.learnCourse.name}{" "}
                {course.new && <img src={neww} className="new" alt="" />}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={props.onOpenModal} className="mt15 tw-btn">
        Add more Courses +
      </button>
    </div>
  );
});
