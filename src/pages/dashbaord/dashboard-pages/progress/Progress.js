import React, { useState, useContext } from "react";
import Select from "react-select";
import { motion } from "framer-motion";

import "./Progress.scss";
import Statistics from "../../../../components/statistics/Statistics";

import subscribe from "../../../../assets/images/subscribe.svg";
import disabled from "../../../../assets/images/disabled.png";
import Badges from "../../../../components/badges/Badges";
import Links from "../../../../components/sidebar/Links";
import Days from "../../../../components/days/Days";
import { userContext } from "../../../../store/UserContext";
import { withRouter } from "react-router-dom";

export default withRouter(function Progress({ history }) {
  const context = useContext(userContext);
  const { userCourses, user } = context;
  const courses_ = userCourses.map((c) => {
    return {
      ...c,
      label: c.name,
      value: c.name,
    };
  });
  const options = [
    { value: "Videos", label: "Videos" },
    { value: "Quizzes", label: "Quizzes" },
  ];
  const days = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Subday", label: "Subday" },
  ];
  const [selectedOption, setselectedOption] = useState("");
  const [selectedOption_, setselectedOption_] = useState("");

  const handleChange = (selectedOption) => {
    setselectedOption(selectedOption);
  };
  const handleChange_ = (selectedOption) => {
    setselectedOption_(selectedOption);
  };

  const toSub = () => {
    history.push("/dashboard/subscribe");
  };

  const handleChangeCourse = (e) => console.log(e);

  return (
    <motion.div
      className="progress"
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw" }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {user.isSubscribed ? (
        <div className="wide-side">
          <p className="heading bg-top">Learning Statistics</p>
          <div className="stats bg-bottom">
            <p className="sub-heading">
              Latest activity may take 10 mins to show below.
            </p>
            <div className="filters">
              <div className="selects">
                <Select
                  placeholder="Last 7 days"
                  value={selectedOption_}
                  onChange={handleChange_}
                  options={days}
                />
              </div>
              <div className="selects">
                <Select
                  placeholder="Activities"
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                  styles={{ width: 120, marginTop: "-10px" }}
                />
              </div>
              <button className="tw-btn">Search</button>
            </div>

            <div className="fixed-table mt40">
              <div className="tr thead">
                <div className="th activity">Activity</div>
                <div className="th">Date</div>
                <div className="th">Level</div>
                <div className="th points">Points aquired</div>
                <div className="th">Test score</div>
              </div>
              {/* <div className="tbody">
              <div className="tr">
                <div className="td activity"> Mathematics quiz 1</div>
                <div className="td">05/05/2020</div>
                <div className="td">Level 1</div>
                <div className="td points">1000</div>
                <div className="td">12/21</div>
              </div>
            </div> */}
              <div
                style={{ textAlign: "center", paddingTop: 5, fontSize: "1rem" }}
              >
                You dont have enough data to pull stats yet
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="wide-side sub">
          <p className="top">
            Get real-time analytics on your learning progress
          </p>
          <p className="btm">
            Get 360 degree insights and analytics on your progress. Data such as
            time spent on videos, correct answer streaks, coins collected and
            general progress on lessons and tests taken are shown in easy to
            read graphs and charts.
          </p>
          <button className="blue-btn" onClick={toSub}>
            Subscribe
          </button>
          <br /> <br />
          <img src={subscribe} alt="" />
        </div>
      )}

      <div className={`narrow-side ${user.isSubscribed ? "" : "greyscale"}`}>
        <div className="bg_white">
          <p className="heading bg-top">
            Overall Statistics
            <span className="f-right">
              <select
                style={{
                  width: "100px",
                  height: "30px",
                  border: "1px solid #eee",
                  marginTop: "-10px",
                }}
              >
                {courses_.map((course) => (
                  <option key={course.name} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </span>
          </p>
          <Statistics />
        </div>
        <div className="bg_white mt30 bordered">
          <p className="heading">Days learnt</p>
          <Days />
        </div>
      </div>
    </motion.div>
  );
});
