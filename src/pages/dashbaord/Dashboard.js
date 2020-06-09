import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.scss";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { userContext } from "../../store/UserContext";
import { motion } from "framer-motion";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";
import Nav from "../../components/nav/Nav";
import Learn from "./dashboard-pages/Learn/Learn";
import Profile from "./dashboard-pages/profile/Profile";
import Progress from "./dashboard-pages/progress/Progress";

import userIcon from "../../assets/images/user.svg";
import editIcon from "../../assets/images/edit.svg";
import coins from "../../assets/images/coins.svg";
import trophy from "../../assets/images/Trophy.svg";
import Badge1 from "../../assets/images/Badge1.svg";
import Badge2 from "../../assets/images/Badge2.svg";
import Medal from "../../assets/images/Medal.svg";
import Loader from "../../components/loader/Loader";
import authServices from "../../services/authServices";

const Dashboard = (props) => {
  let match = useRouteMatch();
  const context = useContext(userContext);
  const { updateSubjects } = context;

  let { loading } = context;

  useEffect(() => {}, []);

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard">
        <Nav />
        <div className="side">
          <Sidebar />
        </div>

        <div className="contents">
          <div className="banner">
            <p>Your dependable learning buddy</p>

            <div className="user_">
              <img src={userIcon} className="usericon" alt="" />
              <div className="edit">
                <img
                  src={editIcon}
                  style={{ height: "20px", margin: "10px auto" }}
                  alt=""
                />
              </div>
            </div>
            <p className="user-details_">
              Chisom Blessing
              <span>Junior secondary</span>
            </p>
            <div className="medals_">
              <div className="medal b1">
                <img src={coins} alt="" />
                <span>5</span>
              </div>
              <div className="medal b2">
                <img src={trophy} alt="" />
                <span>7</span>
              </div>
              <div className="medal b3">
                <img src={Medal} alt="" />
                <span>12</span>
              </div>
              <div className="medal b4">
                <img src={Badge1} alt="" />
                <span>10</span>
              </div>
              <div className="medal b5">
                <img src={Badge2} alt="" />
                <span>0</span>
              </div>
            </div>
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
                <Learn />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
