import React, { useContext, useState } from "react";
// import { userContext } from "../../store/UserContext";
import "./Signup.scss";

import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import twitter from "../../assets/images/twitter.svg";
import eye from "../../assets/images/eye.svg";
import { Link, withRouter } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import flex from "../../assets/images/flex1.png";
import flex2 from "../../assets/images/Slide-Image-2.png";
import flex3 from "../../assets/images/Slide-Image-3.png";
import logo from "../../assets/images/logo.svg";
import logo2 from "../../assets/images/logo.png";

export default withRouter(function Signup(props) {
  // const context = useContext(userContext);

  const [viewPwrd, setViewPwrd] = useState(false);
  const pwrdType = viewPwrd ? "text" : "password";

  const signup = () => {
    props.history.push("/dashboard");
  };

  return (
    <div className="signup">
      <div className="left-side">
        <img
          src={logo}
          alt=""
          style={{ width: 170, position: "absolute", top: 60, left: 100 }}
        />
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          transitionTime={10}
          interval={4000}
          autoPlay={true}
        >
          <div className="myslide">
            <p className="main-text">Choose your study mate wisely</p>
            <p className="smalls">
              There are over 1000 video lessons across several topics and
              subjects provided for you at the speed of your internet and at the
              comfort of your home.
            </p>
            <img src={flex} alt="" />
          </div>
          <div className="myslide">
            <p className="main-text">24hour access to quality learning</p>
            <p className="smalls">
              There are over 1000 video lessons across several topics and
              subjects provided for you at the speed of your internet and at the
              comfort of your home.
            </p>
            <img src={flex2} alt="" />
          </div>
          <div className="myslide">
            <p className="main-text">Access quality content every time</p>
            <p className="smalls">
              There are over 1000 video lessons across several topics and
              subjects provided for you at the speed of your internet and at the
              comfort of your home.
            </p>
            <img src={flex3} alt="" />
          </div>
        </Carousel>
      </div>

      <div className="right-side">
        <div className="mobileLogo">
          <img src={logo2} alt="" />
        </div>

        <p className="welcome mt50">Sign up to Studymate</p>

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
          <div className="half">
            <span className="label">First name</span>
            <input type="text" />
          </div>
          <div className="half f-right">
            <span className="label">Last name</span>
            <input type="text" />
          </div>

          <span className="label">Email address</span>
          <input type="text" />

          <div className="inp-wrap">
            <span className="label">Password</span>
            <input type={pwrdType} />
            <img
              src={eye}
              onClick={() => setViewPwrd(!viewPwrd)}
              alt=""
              className="eye"
            />
          </div>

          <span className="forgot blue--text">Forgot password?</span>

          <button className="main-btn mt30" onClick={signup}>
            Create account
          </button>

          <span className="no-acct">
            <Link to="/login">
              Have an account? <span className="blue--text">Login</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
});
