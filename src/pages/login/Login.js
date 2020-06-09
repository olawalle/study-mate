import React, { useEffect, useContext, useState } from "react";
import { userContext } from "../../store/UserContext";
import "./Login.scss";

import logo from "../../assets/images/logo.svg";
import logo2 from "../../assets/images/logo.png";
import dots from "../../assets/images/Dots.svg";
import eye from "../../assets/images/eye.svg";
import { Link, withRouter } from "react-router-dom";
import { motion } from "framer-motion";

import authServices from "../../services/authServices";
import Loader from "../../components/loader/Loader";

export default withRouter(function Login(props) {
  const context = useContext(userContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [viewPwrd, setViewPwrd] = useState(false);

  const {
    updateLoader,
    updateUser,
    updateLoggedInStatus,
    updateUserCourses,
    updateAwards,
    updateSubjects,
    loading,
    awards,
    pageTransitions,
  } = context;

  const pwrdType = viewPwrd ? "text" : "password";

  useEffect(() => {
    authServices
      .getAwards()
      .then((res) => {
        console.log(res);
        updateAwards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    authServices
      .getAllCourses()
      .then((res) => {
        let subjects = res.data.map((d) => {
          return {
            ...d,
            selected: false,
          };
        });
        updateSubjects(subjects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const login = () => {
    let data = {
      email,
      password,
    };
    updateLoader(true);
    authServices
      .login(data)
      .then((res) => {
        console.log(res);
        let user = res.data;
        localStorage.setItem("studymate-token", user.token);
        updateUser(user);
        updateLoggedInStatus(true);
        authServices.getCurrentUser(user.token);
        authServices
          .getUserCourses(user.token, user.id)
          .then((res) => {
            console.log("usercourses", res.data.userLearnCourses);
            updateUserCourses(res.data.userLearnCourses);
            updateLoader(false);
            setTimeout(() => {
              props.history.push("/dashboard");
            }, 500);
          })
          .catch((err) => {
            console.log(err);
          });

        authServices
          .getUserAward(user.id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log({ err });
          });

        authServices
          .getLeaderboard(user.id, awards[0].id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log({ err });
          });
      })
      .catch((err) => {
        console.log({ err });
        updateLoader(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <motion.div
        className="login"
        initial={{ opacity: 0, x: "-5vw" }}
        animate={{ opacity: 1, x: "0vw" }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="left-side">
          <img
            src={logo}
            alt=""
            style={{ width: 170, position: "absolute", top: 50, left: 50 }}
          />

          <img src={dots} className="left-dot" alt="" />
          <img src={dots} className="right-dot" alt="" />
          <div className="student"></div>
          <div className="teacher"></div>
        </div>

        <div className="right-side">
          <div className="mobileLogo">
            <img src={logo2} alt="" />
          </div>

          <p className="welcome mt50">Good to see you again!</p>

          <div className="buttons">
            <button className="fb"></button>
            <button className="tw"></button>
            <button className="gg"></button>
          </div>
          <p className="or">
            <span>or</span>
          </p>
          <div className="form">
            <span className="label">Email address</span>
            <input type="text" onChange={(e) => setemail(e.target.value)} />

            <div className="inp-wrap">
              <span className="label">Password</span>
              <input
                type={pwrdType}
                onChange={(e) => setpassword(e.target.value)}
              />
              <img
                src={eye}
                onClick={() => setViewPwrd(!viewPwrd)}
                alt=""
                className="eye"
              />
            </div>

            <span className="forgot blue--text">Forgot password?</span>

            <button className="main-btn mt30" onClick={login}>
              Log in
            </button>

            <span className="no-acct">
              <Link to="/signup">
                Don’t have a Studymate account?{" "}
                <span className="blue--text">Create an Account</span>
              </Link>
            </span>
          </div>

          <p className="cc">
            @2020 All Rights Reserved. Studymate Powered by InfoMall Nigeria
          </p>
        </div>
      </motion.div>
    </>
  );
});
