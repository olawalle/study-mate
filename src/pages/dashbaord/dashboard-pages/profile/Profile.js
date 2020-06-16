import React, { useState, useContext } from "react";
import "./Profile.scss";
import Switch from "react-switch";
import { motion } from "framer-motion";
import Links from "../../../../components/sidebar/Links";
import Leaderboard from "../../../../components/leaderboard/Leaderboard";
import { userContext } from "../../../../store/UserContext";
import { withRouter } from "react-router-dom";
import sub from "../../../../assets/images/sub.svg";
import b1 from "../../../../assets/images/b1.svg";
import b2 from "../../../../assets/images/b2.svg";
import b3 from "../../../../assets/images/b3.svg";
import b4 from "../../../../assets/images/b4.svg";
import b5 from "../../../../assets/images/b5.svg";
import streak from "../../../../assets/images/streak.svg";
import niceListerner from "../../../../assets/images/Nice-listener.svg";
import greatListerner from "../../../../assets/images/Great-Listener.svg";
import scholar from "../../../../assets/images/Scholar.svg";
import back from "../../../../assets/images/back.svg";
import Achievements from "../../../../components/badges/Achievements";

export default withRouter(function Profile({ history }) {
  const context = useContext(userContext);
  const { user } = context;
  const [seeAchievements, setseeAchievements] = useState(false);
  const [streaks, setstreaks] = useState([
    {
      title: "Nice streak",
      subText:
        "You have answered 10 questions correctly in a row within this level!",
      image: streak,
      selected: true,
    },
    {
      title: "Scholar",
      subText: "You have finished all levels of this course for English!",
      image: scholar,
      selected: false,
    },
    {
      title: "Nice Listener",
      subText: "You have watched 15 minutes of video lessons per level!",
      image: niceListerner,
      selected: false,
    },
    {
      title: "Due diligence",
      subText:
        " You have watch 30 minutes record time of uninterrupted video lessons in this level!",
      image: greatListerner,
      selected: false,
    },
    {
      title: "Speedy",
      subText: "You answered this question in less than 5 seconds!",
      image: streak,
      selected: false,
    },
    {
      title: "Good sport",
      subText: "You just earned a badge for sharing knowledge with a friend!",
      image: scholar,
      selected: false,
    },
  ]);

  const [activeBadge, setactiveBadge] = useState(0);
  const [badges, setbadges] = useState([
    {
      image: b1,
      name: "Overall",
      story: `Score the highest points to be at the top of the Leaderboard! This includes topping the charts on videos watched and high test points accumulated.`,
    },
    {
      image: b2,
      name: "Silver",
      story: `Be the second best at the top of the Leaderboard! This includes topping the charts in second place on videos watched and high test points accumulated.`,
    },
    {
      image: b3,
      name: "Bronze",
      story: `Take the third place on the Leaderboard.  This includes topping the charts in third place on videos watched and high test points accumulated. `,
    },
    {
      image: b4,
      name: "Flagship Badge",
      story: `Finish one Study Pack with 70% pass to earn this *Flagship Badge*`,
    },
    {
      image: b5,
      name: "Champion Badge",
      story: `Finish all Study Packs per subject with at least 60% and above pass to earn this *Champion Badge* That is, you would be a *Champion in Mathematics or English or Biology....*`,
    },
  ]);

  const toEdit = () => {
    history.push("/edit-profile");
  };

  return (
    <motion.div
      className="profile"
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw" }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {seeAchievements ? (
        <div className="wide achs">
          <p
            className="heading"
            style={{ cursor: "pointer" }}
            onClick={() => setseeAchievements(false)}
          >
            <img src={back} alt="" height="25" />
            Achievements
          </p>
          <div className="arc-contents">
            <div className="trophies">
              {badges.map((badge, i) => (
                <div
                  key={badge.name}
                  onClick={() => setactiveBadge(i)}
                  className={`trophy ${i !== activeBadge ? "inactive" : ""}`}
                >
                  <img src={badge.image} alt="" height="70" />
                  <p>{badge.name}</p>
                </div>
              ))}
            </div>
            <p className="tro-desc">{badges[activeBadge].story}</p>

            <p className="possibles">Possible badges</p>

            <div className="streaks">
              {streaks.map((streak, i) => (
                <div className="streak" key={streak.subText + i}>
                  <div className="ing">
                    <img src={streak.image} alt="" />
                  </div>
                  <div className="streak-text">
                    <p className="top">{streak.title}</p>
                    <p style={{ fontSize: 12 }}>{streak.subText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="wide">
          <p className="heading">Personal Information</p>
          <div className="form">
            <div className="half">
              <span>Full Name</span>
              <p>{`${user.firstName} ${user.surName}`}</p>
            </div>
            <div className="half">
              <span>Username</span>
              <p>{user.userName}</p>
            </div>
            <div className="half">
              <span>Email Address</span>
              <p>{user.email}</p>
            </div>
            <div className="half">
              <span>Location</span>
              <p>{user.location || "----"}</p>
            </div>
            <div className="half">
              <button onClick={toEdit} className="blue-btn">
                Edit my profile
              </button>
            </div>
            <div className="half"></div>
          </div>

          <div className="badgess">
            <Achievements setseeAchievements={setseeAchievements} />
          </div>

          <div className="lbd">
            <Leaderboard />
          </div>

          <div className="subs">
            <div className="img">
              <img src={sub} alt="" />
            </div>
            <div className="sub-text">
              <span className="blue--text">Active Subscription</span>
              <p>
                Your account is active. Continue learning to improve your rank
                at the leader board
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="small">
        <Leaderboard />
      </div>
    </motion.div>
  );
});
