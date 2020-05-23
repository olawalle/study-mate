import React, { useState, useContext } from "react";
import "./Dashboard.scss";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { userContext } from "../../store/UserContext";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";
import Nav from "../../components/nav/Nav";
import Learn from "./dashboard-pages/Learn/Learn";
import Profile from "./dashboard-pages/profile/Profile";
import Progress from "./dashboard-pages/progress/Progress";

import banner1 from "../../assets/images/banner1.svg";
import banner2 from "../../assets/images/Subjects.svg";

const Dashboard = (props) => {
  let match = useRouteMatch();
  const context = useContext(userContext);

  let { subjects } = context;
  console.log(subjects);
  const [open, setopen] = useState(false);
  const [step, setStep] = useState(1);

  const onOpenModal = () => {
    setopen(true);
  };

  const onCloseModal = () => {
    setopen(false);
  };

  const jumpStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="dashboard">
      <Nav />
      <div className="side">
        <Sidebar />
      </div>

      <div className="contents">
        <div className="banner">
          <p>Your study mate</p>
        </div>
        <div className="main-content">
          <Switch>
            <Route path={`${match.path}profile`}>
              <Profile />
            </Route>
            <Route path={`${match.path}progress`}>
              <Progress />
            </Route>
            <Route path={match.path}>
              <Learn onOpenModal={onOpenModal} />
            </Route>
          </Switch>
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
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
  );
};

export default Dashboard;
