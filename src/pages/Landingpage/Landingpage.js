import React, { useState } from "react";
import Carousel from "./Carousel";
import "./Landingpage.scss";
import { withRouter } from "react-router-dom";

const LandingPage = ({ history }) => {
  const [show_nav, setshow_nav] = useState(false);
  const toAuth = (n) => {
    n === 1 ? history.push("/login") : history.push("/signup");
  };

  return (
    <div className="page-wrapper">
      <div className="nav-wrapper nav__wrapper">
        <nav className="navbar">
          <img className="desktop" src="images/logo.svg" alt="Company Logo" />
          <img
            className="mobile"
            src="images/white-logo.svg"
            alt="mobile logo"
          />
          <div
            id="nav-icon1"
            onClick={() => setshow_nav(!show_nav)}
            className={show_nav ? "open" : ""}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* <div className="menu-toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div> */}

          <ul className={show_nav ? "no-search open" : "no-search"}>
            <li className="nav-item courses">
              <a href="#">Courses</a>
            </li>
            <li className="nav-item about">
              <a href="#">About studymate</a>
            </li>
            <li className="nav-item" onClick={() => toAuth(1)}>
              <a>Login</a>
            </li>
            <li className="nav-item sign__up" onClick={() => toAuth(2)}>
              <a>Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="ui container__ hero__section">
        <div className="ui stackable grid">
          <div className="nine wide column">
            <div className="hero__left">
              <div className="curved__caption">#No 1 platform for learning</div>
              <h1>Your Dependable Learning Buddy</h1>
              <div className="caption__content">
                <span className="light">
                  Give your child a study partner that understands and
                  communicates knowledge for excellence in exams and practice.
                </span>
              </div>
              <div className="enroll__wrapper">
                <button>Enroll Now</button>
              </div>
            </div>
          </div>
          <div className="seven wide column">
            <div className="wrap__tutor">
              <img className="top__dot" src="images/dots.svg" />
              <img className="bottom__dot" src="images/dots.svg" />
              <div className="wrap__image">
                <img src="images/bahose.png" alt="tutor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui container__ inhome__tutor">
        <div className="caption__header">
          <h1>The Trusted Name Name for In-Home Tutoring</h1>
        </div>
        <div className="ui stackable grid boxes">
          <div className="four wide column">
            <div className="box">
              <div className="icon__image">
                <img src="images/reading-avatar.svg" />
              </div>
              <h2>Learn</h2>
              <div className="caption">
                <span className="light">
                  1,000 video lessons across various subjects in Junior and
                  Senior Secondary
                </span>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className="box">
              <div className="icon__image">
                <img src="images/tick-tock.svg" />
              </div>
              <h2>24 Hours Acess</h2>
              <div className="caption">
                <span className="light">
                  Content and test questions are available 24-hours a day, 7
                  days a week
                </span>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className="box">
              <div className="icon__image">
                <img src="images/chrome-icon.svg" />
              </div>
              <h2>Statistics</h2>
              <div className="caption">
                <span className="light">
                  Each test taken by your ward is documented, that way you can
                  track their progress.
                </span>
              </div>
            </div>
          </div>
          <div className="four wide column">
            <div className="box">
              <div className="icon__image">
                <img src="images/thumbs-up.svg" />
              </div>
              <h2>Easy to use</h2>
              <div className="caption">
                <span className="light">
                  Our extremely user friendly pages make it easy to navigate and
                  learn.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="watch__video">
        <div className="ui container__">
          <div className="ui stackable grid">
            <div className="eight wide column bg__wrapper">
              <div className="justify__content">
                <div className="video__background">
                  <div className="video__wrap">
                    <a
                      href="https://youtu.be/kP_Abl8gKyg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="images/video.svg" alt="play video" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="eight wide column">
              <div className="video__right">
                <div className="curved__caption">
                  #No 1 platform for learning
                </div>
                <h1>Your Dependable Learning Buddy</h1>
                <div className="caption__content light">
                  <span className="light">
                    Parents want to give their ward the best education possible.
                    StudyMate enables each student assimilate lessons that may
                    not have been well taught in class. With over 1,000 lessons
                    and 10,000 test questions and solutions to test
                    comprehension, accompanied by progress trackers, the
                    student's genius will be unlocked. Enroll!!
                  </span>
                </div>
                <div className="enroll__wrapper">
                  <button>Enroll Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel__section">
        <div className="ui container__">
          <div className="ui stackable grid">
            <div className="eight wide column">
              <div className="carousel__caption">
                <h1>Browse Our Subject Catalogue</h1>
                <div className="caption__content">
                  <span className="light">
                    Give your child a study partner that understands and
                    communicates knowledge for excellence in exams and practice.
                  </span>
                </div>
              </div>
            </div>
            <div className="eight wide column"></div>
          </div>
        </div>
        <div style={{ marginRight: 0 }} className="ui container__">
          <Carousel />
        </div>
        <div className="ui container__">
          <div className="explore__section">
            <button>Explore all</button>
          </div>
        </div>

        <div className="package__section">
          <div className="ui container__ curvy">
            <div className="ui stackable grid">
              <div className="six wide column study__pack">
                <img src="images/package.svg" alt="studypack" />
              </div>
              <div className="ten wide column">
                <h5>Be the first to know when we launch the product</h5>
                <h1>Subscribe to our newsletter for updates</h1>
                <div className="ui action input">
                  <input type="text" placeholder="Enter email address" />
                  <button className="ui button">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__section">
        <div className="container__">
          <div className="ui stackable grid">
            <div className="seven wide column left__footer1">
              <div className="logo__section">
                <img src="images/logo_white.svg" alt="white logo" />
              </div>
              <div className="caption">
                <span className="light">
                  Give your child a study partner that understands and
                  communicates knowledge for excellence in exams and practice.
                </span>
              </div>
            </div>
            <div className="nine wide column footer__links">
              <div className="ui grid">
                <div className="eight wide mobile four wide computer column">
                  <h3>Resources</h3>
                  <div className="content">
                    <a href="#">About</a>
                    <a href="#">Profile</a>
                    <a href="#">Features</a>
                    <a href="#">Courses</a>
                  </div>
                </div>
                <div className="eight wide mobile four wide computer column">
                  <h3>Community</h3>
                  <div className="content">
                    <a href="#">Help</a>
                    <a href="#">Support</a>
                    <a href="#">Sign Up</a>
                    <a href="#">Login In</a>
                  </div>
                </div>
                <div className="eight wide mobile four wide computer column">
                  <h3>Legal</h3>
                  <div className="content">
                    <a href="#">Terms of Use</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Q&A</a>
                  </div>
                </div>
                <div className="eight wide mobile four wide computer column">
                  <h3>Stay Connected</h3>
                  <div className="content media">
                    <a href="#">
                      <img src="images/Twitter.png" alt="twitter" />
                      Twitter
                    </a>
                    <a href="#">
                      <img src="images/Instagram.png" alt="instagram" />
                      Instagram
                    </a>
                    <a href="#">
                      <img src="images/Facebook.svg" />
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="sixteen wide mobile__call">
              <a href="mailto:info@studymate.ng">
                <span>
                  <img src="images/Message (2).svg" alt="twitter" />
                  info@studymate.ng
                </span>
              </a>
              <a href="tel:+23481185053335">
                <span>
                  <img src="images/Phone (1).svg" alt="twitter" />
                  +23481185053335
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom__footer">
        <div className="container__">
          <div className="ui stackable grid">
            <div className="eight wide column left">
              <span>© StudyMate, 2020. All rights reserved. </span>
            </div>
            <div className="eight wide column right">
              <span>info@studymate.ng | +23481185053335</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LandingPage);
