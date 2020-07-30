import React, { useContext, useEffect } from "react";
import { userContext } from "../../store/UserContext";

import "./Courses.scss";
import neww from "../../assets/images/New.svg";
import Beginner from "../../assets/images/Beginner.svg";
import Intermediate from "../../assets/images/Intermediate.svg";
import Advanced from "../../assets/images/Advanced.svg";
import authServices from "../../services/authServices";
import { withRouter, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import Modal from "react-responsive-modal";
import { useSnackbar } from "react-simple-snackbar";

export default withRouter(function Courses(props) {
  let match = useRouteMatch();

  const context = useContext(userContext);
  const {
    userCourses,
    testId_,
    fixBack,
    updateTestId,
    updatefixBack,
    updateLoader,
    selectedSubject: { id: selectedSubId, ...selectedSubject },
    saveSelectedSubject,
    user,
  } = context;
  console.log({ ucs: userCourses });
  const [openLevels, setopenLevels] = useState(false);
  const [usercourseid, setusercourseid] = useState(0);
  const [pageLoaded, setpageLoaded] = useState(false);
  const [usertests, setusertests] = useState(null);
  const [name, setname] = useState("");
  const [testId, settestId] = useState(testId_);
  const [level, setlevel] = useState(null);
  const [levels, setLevels] = useState([
    "Beginner",
    "Intermediate",
    "Advanced",
  ]);
  const [selectedIndex, setselectedIndex] = useState(null);

  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  useEffect(() => {
    if (openLevels == true) {
      updatefixBack(false);
    }
  }, [fixBack]);
  useEffect(() => {
    setlevel(match.params.level);
    updateLoader(true);
    authServices
      .getUcourseWithTests(user.id, selectedSubject.id)
      .then((res) => {
        const defaultTestId =
          selectedSubject &&
          selectedSubject.tests &&
          selectedSubject.tests.length
            ? selectedSubject.tests[0].id
            : 0;
        const defaultName =
          selectedSubject &&
          selectedSubject.tests &&
          selectedSubject.tests.length
            ? selectedSubject.tests[0].name
            : "Beginner";
        settestId(defaultTestId);
        setname(defaultName);
        setusercourseid(res.data.id);
        console.log({ usertest: res.data.userTests });
        setusertests(res.data.userTests);
        updateLoader(false);
        setpageLoaded(true);
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
  }, [level]);

  const onCloseLevelsModal = () => {
    setopenLevels(false);
  };

  let sortesubjects = userCourses
    .map((subject, i) => {
      console.log({ subject });
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
        : user.level === 0
        ? c.course.studyLevel === 3
        : c.course.studyLevel === user.level
    )
    .sort((a, b) => {
      if (a.width < b.width) return -1;
      if (a.width > b.width) return 1;
      return 0;
    });

  const allowedCourses = [
    "CREATIVE AND CULTURAL ART",
    "Mathematics",
    "Further Mathematics",
    "Chemistry",
  ];

  function validateCourse(courseA, courseB, level) {
    courseA = courseA.toLowerCase();
    courseB = courseB.toLowerCase();
    if (courseB === "mathematics" && courseA === courseB && level === 3) {
      return true;
    } else if (
      courseB === "mathematics" &&
      courseA === courseB &&
      level !== 3
    ) {
      return false;
    }
    return courseA === courseB;
  }

  function isCourseAllowed(course) {
    return allowedCourses.some((ac) =>
      validateCourse(ac, course.course.name, course.course.studyLevel)
    );
  }

  const selectCourse = (course, i) => {
    console.log({ course });
    if (!isCourseAllowed(course) && !user.isSubscribed) {
      openSnackbar("Please subscribe to access this subject", 50000);
      props.history.push("/dashboard/subscribe");
      return;
    }
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

  const setDefaultCourseItem = () => {
    if (sortesubjects.length && !selectedSubject.name) {
      if (user.isSubscribed) {
        selectCourse(sortesubjects[0], 0);
      } else {
        const sub = sortesubjects.filter((s) => isCourseAllowed(s));
        if (sub.length) {
          selectCourse(sub[0], 0);
        }
      }
    }
  };

  const pickLevel__ = (test, j) => {
    setname(test.year);
    updateTestId(test.id);
    setlevel(test.year);
    setselectedIndex(j);
  };

  const goToSubject = () => {
    let i = selectedIndex;
    let level = i === 0 ? "Beginner" : i === 1 ? "Intermediate" : "Advanced";
    props.history.push(`/subject/${selectedSubject.name}/${level}`);
  };

  useEffect(() => {
    setDefaultCourseItem();
  }, [selectedSubId]);

  console.log("selected sub", selectedSubject);

  return (
    <div className="courses-wrap">
      <div className="courses">
        <div className="flex-grid-thirds">
          {sortesubjects.map((course, i) => {
            return (
              <div
                key={course.name + i}
                onClick={() => selectCourse(course, i)}
                style={{ textTransform: "uppercase" }}
                className={`min__width bg_${(i % 17) + 2}
                                ${
                                  !isCourseAllowed(course) && !user.isSubscribed
                                    ? "greyed"
                                    : ""
                                }
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
            {selectedSubject &&
              selectedSubject.tests &&
              selectedSubject.tests.map((test, i) => (
                <div>
                  <div
                    key={test.id}
                    onClick={() => pickLevel__(test, i)}
                    className={`level bordered ${
                      i === selectedIndex ? "selected" : ""
                    }`}
                  >
                    <img
                      src={
                        i === 0
                          ? "Beginner"
                          : i === 1
                          ? "Intermediate"
                          : "Advanced"
                      }
                      alt=""
                    />{" "}
                    <span>{test.year}</span>
                  </div>
                </div>
              ))}
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
