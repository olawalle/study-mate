import React, { useContext } from "react";
import { userContext } from "../../store/UserContext";

import "./Courses.scss";

export default function Courses(props) {
  const context = useContext(userContext);
  const { subjects } = context;
  let sortesubjects = subjects
    .map((subject) => {
      return {
        ...subject,
        width:
          subject.name.length <= 7
            ? 1
            : subject.name.length > 7 && subject.name.length <= 13
            ? 2
            : 3,
      };
    })
    .sort((a, b) => {
      if (a.width < b.width) return -1;
      if (a.width > b.width) return 1;
      return 0;
    });

  console.log(sortesubjects);
  return (
    <div className="courses">
      <div className="flex-grid-thirds">
        <p className="title mt30">Courses</p>
        {sortesubjects.map((course) => {
          return (
            <div
              className={`course ${
                course.width === 3
                  ? "wide"
                  : course.width === 2
                  ? "mid"
                  : "small"
              }`}
            >
              {course.name}{" "}
            </div>
          );
        })}
        <button onClick={props.onOpenModal} className="tw-btn">
          Add more Courses +
        </button>
      </div>
    </div>
  );
}
