import React, { useState } from "react";
import "./Quiz-question.scss";
import ProgressBar from "../progress-bar/ProgressBar";

export default function QuizQuestion(props) {
  const [passage, setpassage] = useState(false);
  return (
    <div className="quiz-quuestion">
      <div className="upper">
        <div>
          <p className="instruction">Answer question 1 to 5 with the passage</p>
          <ProgressBar />
        </div>
        <div className="content">
          <p className="question">
            Musa has a choice of buying a shirt and a bag. What is the
            opportunity cost of buying a book Musa has a choice of buying a
            shirt and a bag. What is the opportunity cost of buying a book Musa
            has a choice of buying a shirt and a bag. What is the opportunity
            cost of buying a book?
          </p>

          <div className="answer correct">
            <span className="label">A</span>
            <p>A book and a bag</p>
            <h4 className="caveat">correct answer</h4>
          </div>
          <div className="answer">
            <span className="label">B</span>
            <p>A book and a bag</p>
          </div>
          <div className="answer">
            <span className="label">C</span>
            <p>A book and a bag</p>
          </div>
          <div className="answer">
            <span className="label">D</span>
            <p>A book and a bag</p>
          </div>
        </div>
        {passage && (
          <div className="passage">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
            sapiente dolore mollitia harum. Laboriosam nobis eaque recusandae
            tempore porro quibusdam rerum saepe nihil, doloribus culpa corrupti
            fugiat quia labore nostrum? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Quasi sapiente dolore mollitia harum. Laboriosam
            nobis eaque recusandae tempore porro quibusdam rerum saepe nihil,
            doloribus culpa corrupti fugiat quia labore nostrum? Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Quasi sapiente dolore
            mollitia harum. Laboriosam nobis eaque recusandae tempore porro
            quibusdam rerum saepe nihil, doloribus culpa corrupti fugiat quia
            labore nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quasi sapiente dolore mollitia harum. Laboriosam nobis eaque
            recusandae tempore porro quibusdam rerum saepe nihil, doloribus
            culpa corrupti fugiat quia labore nostrum? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Quasi sapiente dolore mollitia
            harum. Laboriosam nobis eaque recusandae tempore porro quibusdam
            rerum saepe nihil, doloribus culpa corrupti fugiat quia labore
            nostrum?
          </div>
        )}
      </div>
      <div className="footer">
        <b>4</b> of 10
        <button
          className="tw-btn"
          onClick={() => props.completeTest()}
          style={{ marginLeft: 20 }}
        >
          SUBMIT
        </button>
        <button className="blue-btn" onClick={() => setpassage(!passage)}>
          {passage ? "Close passage" : "Open passage"}
        </button>
      </div>
    </div>
  );
}
