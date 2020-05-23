import React, { useEffect } from "react";
import "./Learn.scss";

import Badges from "../../../../components/badges/Badges";

import play from "../../../../assets/images/play.svg";
import Quiz from "../../../../components/quiz/Quiz";
import Courses from "../../../../components/courses/Courses";

export default function Learn(props) {
  useEffect(() => {
    props.onOpenModal();
  }, []);
  return (
    <div className="learn">
      <div className="wide-side">
        <p className="heading">Learning Statistics</p>
        <div className="lessons-wrap">
          <p className="sub-heading">
            Section A<button className="tw-btn f-right">Start learning</button>
          </p>

          <div className="lessons mt10">
            <div className="lesson">
              <p>
                <img src={play} width="13" className="mr25" alt="" />
                Mathematics quiz 1
              </p>
            </div>
            <div className="lesson">
              <p>
                <img src={play} width="13" className="mr25" alt="" />
                Mathematics quiz 1
              </p>
            </div>
            <div className="lesson">
              <p>
                <img src={play} width="13" className="mr25" alt="" />
                Mathematics quiz 1
              </p>
            </div>
            <div className="lesson">
              <p>
                <img src={play} width="13" className="mr25" alt="" />
                Mathematics quiz 1
              </p>
            </div>
            <div className="lesson">
              <p>
                <img src={play} width="13" className="mr25" alt="" />
                Mathematics quiz 1
              </p>
            </div>
            <div className="lesson">
              <p>
                <img src={play} width="13" className="mr25" alt="" />
                Mathematics quiz 1
              </p>
            </div>
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
          <Courses onOpenModal={props.onOpenModal} className="mt20" />
        </div>
      </div>
    </div>
  );
}
