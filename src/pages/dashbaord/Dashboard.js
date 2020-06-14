import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.scss";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { userContext } from "../../store/UserContext";
import { motion } from "framer-motion";

import { Switch, Route, useRouteMatch, withRouter } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";
import Nav from "../../components/nav/Nav";
import Learn from "./dashboard-pages/Learn/Learn";
import Profile from "./dashboard-pages/profile/Profile";
import Progress from "./dashboard-pages/progress/Progress";

import userIcon from "../../assets/images/user.svg";
import editIcon from "../../assets/images/edit.svg";
import Loader from "../../components/loader/Loader";
import authServices from "../../services/authServices";
import MobileCourses from "./dashboard-pages/mobileCourses/MobileCourses";

const Dashboard = (props) => {
  let match = useRouteMatch();
  const context = useContext(userContext);
  const { updateSubjects, user } = context;

  let { loading } = context;
  let path = props.history.location.pathname;

  useEffect(() => {
    console.log(props.history.location.pathname);
  }, [match]);

  const backToDash = () => props.history.push("/dashboard/");

  const flowRoute = () => {
    if (path === "/dashboard/mobile-courses") {
      return {
        text: "Home",
        title: "Select a prefered course",
      };
    }
    if (path === "/dashboard/profile") {
      return {
        text: "Home",
        title: "Profile",
        largeTitle: "My Profile",
      };
    }
    if (path === "/dashboard/progress") {
      return {
        text: "Home",
        title: "Progress",
        largeTitle: "Progress Wall",
      };
    }
    if (path === "/dashboard/") {
      return {
        text: "Home",
        title: "Learn",
        largeTitle: "Your dependable learning buddy",
      };
    }
    return {};
  };

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard">
        <Nav />
        <div className="side">
          <Sidebar />
        </div>

        <div className="contents">
          <div className={`banner ${!match.isExact && "shrink"}`}>
            <p className="title_">{flowRoute().largeTitle}</p>
            {flowRoute().text && (
              <span
                onClick={backToDash}
                className={`mobile-title-text ${
                  path === "/dashboard/" && "none"
                }`}
              >
                {flowRoute().text}
              </span>
            )}
            {flowRoute().title && (
              <p className={`mobile-title ${path === "/dashboard/" && "none"}`}>
                {flowRoute().title}
              </p>
            )}
            {match.isExact && (
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
            )}
            {match.isExact && (
              <p className="user-details_">
                {`${user.firstName} ${user.surName}`}
                <span>Junior secondary</span>
              </p>
            )}
          </div>
          <div className="main-content">
            <Switch>
              <Route path={`${match.path}profile`}>
                <Profile />
              </Route>
              <Route path={`${match.path}progress`}>
                <Progress />
              </Route>
              <Route path={`${match.path}mobile-courses`}>
                <MobileCourses />
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

export default withRouter(Dashboard);
