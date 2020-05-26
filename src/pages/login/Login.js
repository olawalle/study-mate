import React, { useEffect, useContext } from "react";
import { userContext } from "../../store/UserContext";
import "./Login.scss";

import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import twitter from "../../assets/images/twitter.svg";
import logo from "../../assets/images/logo.svg";
import { Link, withRouter } from "react-router-dom";

export default withRouter(function Login(props) {
  const context = useContext(userContext);

  const login = () => {
    props.history.push("/dashboard");
  };

  return (
    <div className="login">
      <div className="left-side">
        <img
          src={logo}
          alt=""
          style={{ width: 170, position: "absolute", top: 50, left: 50 }}
        />

        <div className="student"></div>
        <div className="teacher"></div>
      </div>

      <div className="right-side">
        <div className="logo"></div>

        <p className="welcome mt50">Good to see you again!</p>

        <div className="buttons">
          <button className="fb-btn">
            <img src={facebook} alt="" /> <span>Facebook</span>
          </button>
          <button className="tw-btn">
            <img src={twitter} alt="" /> <span>Twitter</span>
          </button>
          <button className="gg-btn">
            <img src={google} alt="" /> <span>Google</span>
          </button>
        </div>
        <p className="or">
          <span>or</span>
        </p>
        <div className="form">
          <span className="label">Email address</span>
          <input type="text" />
          <span className="label">Password</span>
          <input type="text" />

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
    </div>
  );
});