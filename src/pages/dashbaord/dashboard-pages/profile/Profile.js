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
      subText: "Correctly answer 10 problems in a row in a single quiz",
      image: streak,
      selected: true,
    },
    {
      title: "Scholar",
      subText: "Finish watching a particular course video",
      image: scholar,
      selected: false,
    },
    {
      title: "Nice Listener",
      subText:
        "You have watched 15 minutes of a single video in a single topic",
      image: niceListerner,
      selected: false,
    },
    {
      title: "Great Listener",
      subText:
        "You have watched 30 minutes of a single video in a single topic",
      image: greatListerner,
      selected: false,
    },
    {
      title: "Nice streak",
      subText: "Correctly answer 10 problems in a row in a single quiz",
      image: streak,
      selected: false,
    },
    {
      title: "Scholar",
      subText: "Finish watching a particular course video",
      image: scholar,
      selected: false,
    },
  ]);

  const [activeBadge, setactiveBadge] = useState(0);
  const [badges, setbadges] = useState([
    {
      image: b1,
      name: "Overall",
      story: `
      Badge 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsa vitae molestiae nostrum magnam quae voluptates ad ea placeat voluptas sequi, ullam fugiat esse tempora omnis aliquid deleniti accusamus dignissimos.`,
    },
    {
      image: b2,
      name: "Silver",
      story: `
      Badge 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsa vitae molestiae nostrum magnam quae voluptates ad ea placeat voluptas sequi, ullam fugiat esse tempora omnis aliquid deleniti accusamus dignissimos.`,
    },
    {
      image: b3,
      name: "Bronze",
      story: `
      Badge 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsa vitae molestiae nostrum magnam quae voluptates ad ea placeat voluptas sequi, ullam fugiat esse tempora omnis aliquid deleniti accusamus dignissimos.`,
    },
    {
      image: b4,
      name: "Studypack",
      story: `
      Badge 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsa vitae molestiae nostrum magnam quae voluptates ad ea placeat voluptas sequi, ullam fugiat esse tempora omnis aliquid deleniti accusamus dignissimos.`,
    },
    {
      image: b5,
      name: "Studypack 2",
      story: `
      Badge 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsa vitae molestiae nostrum magnam quae voluptates ad ea placeat voluptas sequi, ullam fugiat esse tempora omnis aliquid deleniti accusamus dignissimos.`,
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
                  <img src={badge.image} alt="" />
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
              <span>Full name</span>
              <p>{`${user.firstName} ${user.surName}`}</p>
            </div>
            <div className="half">
              <span>Username</span>
              <p>{user.firstName}</p>
            </div>
            <div className="half">
              <span>Email address</span>
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
