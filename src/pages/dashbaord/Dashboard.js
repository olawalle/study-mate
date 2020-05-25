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

const Dashboard = (props) => {
  let match = useRouteMatch();
  const context = useContext(userContext);

  let { subjects } = context;
  console.log(subjects);

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
              <Learn subjects={subjects} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
