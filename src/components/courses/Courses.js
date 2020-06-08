import React, { useContext, useEffect } from "react";
import { userContext } from "../../store/UserContext";

import "./Courses.scss";
import neww from "../../assets/images/New.svg";
import authServices from "../../services/authServices";

export default function Courses(props) {
  const context = useContext(userContext);
  const {
    userCourses,
    updateLoader,
    selectedSubject,
    saveSelectedSubject,
  } = context;
  console.log(userCourses);
  let sortesubjects = userCourses
    .map((subject, i) => {
      return {
        ...subject,
        width: 2,
        // subject.name.length <= 7
        //   ? 1
        //   : subject.name.length > 7 && subject.name.length <= 13
        //   ? 2
        //   : 3,
        new: false,
      };
    })
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
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });

    authServices
      .getSubjectVideos(course.learnCourseId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    sortesubjects.length && selectCourse(sortesubjects[0]);
  }, []);

  return (
    <div className="courses">
      <div className="flex-grid-thirds">
        <p className="title mt30">Courses</p>
        {sortesubjects.map((course, i) => {
          return (
            <div
              key={course.name}
              onClick={() => selectCourse(course)}
              style={{ textTransform: "capitalize" }}
              className={`bg_${i + 1} course ${
                course.width === 3
                  ? "wide"
                  : course.width === 2
                  ? "mid"
                  : "small"
              }`}
            >
              {course.name}{" "}
              {course.new && <img src={neww} className="new" alt="" />}
            </div>
          );
        })}
        <button onClick={props.onOpenModal} className="mt15 tw-btn">
          Add more Courses +
        </button>
      </div>
    </div>
  );
}
