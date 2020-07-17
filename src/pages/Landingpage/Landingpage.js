import React, { useState } from "react";
import Carousel from "./Carousel";
import "./Landingpage.scss";
import { withRouter } from "react-router-dom";

import macbook from "../../assets/images/macbook.png";
import Nav from "../../components/nav/Nav";
import { googleAuthUrl } from "../../services/urls";

const LandingPage = ({ history }) => {
  const [show_nav, setshow_nav] = useState(false);
  const toAuth = (n) => {
    n === 1 ? history.push("/login") : history.push("/signup");
  };

  const goto = (to) => {
    if (to === "terms") {
      history.push("/terms");
    }
    if (to === "privacy") {
      history.push("/privacy");
    }
    if (to === "faq") {
      history.push("/faq");
    }
  };

  return (
    <div className="page-wrapper">
      <Nav />

      <div className="ui container__ hero__section">
        <div className="ui stackable grid">
          <div className="nine wide column">
            <div className="hero__left">
              {/* <div className="curved__caption">#No 1 platform for learning</div> */}
              <h1>Your Dependable Learning Buddy</h1>
              <div className="caption__content">
                <span className="light">
                  Get access to over 1,000 Junior and Senior Secondary School
                  video lessons on all statutory subjects with over 10,000
                  practice questions at your convenience.
                </span>
              </div>
              <div className="enroll__wrapper">
                <button onClick={() => toAuth(2)}>Enroll Now</button>
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
          <h1>The Trusted Name for In-home Tutoring</h1>
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
              <h2>24 Hours Access</h2>
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
            <div className="eight wide column bg__wrapper video__background">
              <div className="justify__content">
                <div className="">
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
                {/* <div className="curved__caption">
                  #No 1 platform for learning
                </div> */}
                <h1>The Study Mate You Need</h1>
                <div className="caption__content light">
                  <span className="light">
                    Parents want to give their ward the best education possible.
                    StudyMate enhances each student’s ability to assimilate
                    lessons that may not have been well taught in class. With
                    over 1,000 lessons and 10,000 test questions and solutions
                    to aid comprehension, accompanied with progress trackers,
                    every student would love study time!
                  </span>
                </div>
                <div className="enroll__wrapper">
                  <button onClick={() => toAuth(2)}>Enroll Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel__section">
        <div className="ui container__">
          <div className="ui stackable grid">
            <div className="t-center wide column">
              <div className="carousel__caption">
                <h1>Browse Our Subject Catalogue</h1>
                <div className="caption__content">
                  <span className="light">
                    With StudyMate, all subjects become favourites! Let us help
                    you unlock your inner genius!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }} className="ui container__">
          {/* <Carousel /> */}
          <img
            src={macbook}
            className="macbook"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
        {/* <div className="ui container__">
          <div className="explore__section">
            <button>Explore all</button>
          </div>
        </div> */}
      </div>

      <div className="subscriptions">
        <div className="ui container__">
          <div className="ui stackable grid">
            <div className="six wide column">
              <p className="top">
                Enjoy the full benefits of our Robust learning platform
              </p>
              <p className="btm light">
                To get started, select a Plan. There are over 10,000 learning
                resources on our platform; several payment options are also
                available.
              </p>
            </div>
            <div className="five wide column">
              <div className="bw-band band">
                <p className="name">Free</p>
                <p className="price">
                  <span>N0.00</span>/month
                </p>
                <ul>
                  <li>
                    <span> Limited number of contents</span>
                  </li>
                  <li>
                    <span>No points or badges or gamification features </span>
                  </li>
                  <li>
                    <span>No analytics </span>
                  </li>
                  <li>
                    <span>No rewards or benefits</span>
                  </li>
                </ul>

                <button onClick={() => toAuth(1)}>Subscribe</button>
              </div>
            </div>
            <div className="five wide column">
              <div className="pp-band band">
                <p className="name">Standard</p>
                <p className="price">
                  <span>N1,500.00</span>/month
                </p>
                <p className="price">
                  <span>N4,000.00</span>/3months
                </p>
                <p className="price">
                  <span>N15,000.00</span>/yearly
                </p>
                <ul>
                  <li>
                    <span>Full access to all contents</span>
                  </li>
                  <li>
                    <span>
                      Points, badges, levels, and full gamification features
                    </span>
                  </li>
                  <li>
                    <span>Learning Analytics</span>
                  </li>
                  <li>
                    <span>Rewards and benefits</span>
                  </li>
                </ul>

                <button onClick={() => toAuth(1)}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel__section">
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
                  With StudyMate, all subjects become favourites! Let us help
                  you unlock your inner genius!
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
                    <a href="#">Support</a>
                    <a href="#">Sign Up</a>
                    <a href="#">Login In</a>
                  </div>
                </div>
                <div className="eight wide mobile four wide computer column">
                  <h3>Legal</h3>
                  <div className="content">
                    <a onClick={() => goto("terms")}>Terms of Use</a>
                    <a onClick={() => goto("privacy")}>Privacy Policy</a>
                    <a onClick={() => goto("faq")}>Q&A</a>
                  </div>
                </div>
                <div className="eight wide mobile four wide computer column">
                  <h3>Stay Connected</h3>
                  <div className="content media">
                    <a href="#">
                      <img src="images/Twitter.png" alt="twitter" />
                      Twitter
                    </a>
                    <a href="https://www.instagram.com/studymate_ng/">
                      <img src="images/Instagram.png" alt="instagram" />
                      Instagram
                    </a>
                    <a href="https://m.facebook.com/studymateng/">
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
