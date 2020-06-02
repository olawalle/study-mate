import React, { useEffect, useContext } from "react";
import { userContext } from "../../store/UserContext";
import "./Login.scss";

import logo from "../../assets/images/logo.svg";
import logo2 from "../../assets/images/logo.png";
import dots from "../../assets/images/Dots.svg";
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
