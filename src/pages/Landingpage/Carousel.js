import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// ....

// className "owl-theme" is optional
const options = {
  stagePadding: 20,
  items: 3.5,
  loop: true,
  margin: 1,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    //   600: {
    //     items: 3,
    //     nav: false,
    //   },
    1000: {
      items: 3.5,
      nav: true,
      loop: false,
    },
    //   1300: {
    //     items: 5,
    //     nav: true,
    //     loop: false,
    //   },
    //   1700: {
    //     items: 5,
    //     nav: true,
    //     loop: false,
    //   },
  },
};

const Carousel = () => {
  return (
    <OwlCarousel className="owl-theme" {...options}>
      <div className="item">
        <div className="box">
          <div
            className="icon__image maths"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              padding: "15px",
              display: "inline-block",
            }}
          >
            <img src="images/Mathematics-Computer-Presentation-Online education-Collage.svg" />
          </div>
          <h2>Mathematics</h2>
          <div className="available__courses">
            <span>15 course available</span>
          </div>
          <div className="ui two column grid">
            <div className="seven wide column">
              <img src="images/Play.svg" />
              <span className="light">25 videos</span>
            </div>
            <div className="nine wide column">
              <img src="images/Test.svg" />
              <span className="light">150 Questions</span>
            </div>
          </div>
          <div className="view__course">
            <a href="#">View Course</a>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="box">
          <div
            className="icon__image physics"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              padding: "15px",
              display: "inline-block",
            }}
          >
            <img src="images/atom.svg" />
          </div>
          <h2>Physics</h2>
          <div className="available__courses">
            <span>15 courses available</span>
          </div>
          <div className="ui two column grid">
            <div className="seven wide column">
              <img src="images/Play.svg" />
              <span className="light">25 videos</span>
            </div>
            <div className="nine wide column">
              <img src="images/Test.svg" />
              <span className="light">150 Questions</span>
            </div>
          </div>
          <div className="view__course">
            <a href="#">View Course</a>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="box">
          <div
            className="icon__image biology"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              padding: "15px",
              display: "inline-block",
            }}
          >
            <img src="images/virus.svg" />
          </div>
          <h2>Biology</h2>
          <div className="available__courses">
            <span>15 courses available</span>
          </div>
          <div className="ui two column grid">
            <div className="seven wide column">
              <img src="images/Play.svg" />
              <span className="light">25 videos</span>
            </div>
            <div className="nine wide column">
              <img src="images/Test.svg" />
              <span className="light">150 Questions</span>
            </div>
          </div>
          <div className="view__course">
            <a href="#">View Course</a>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="box">
          <div
            className="icon__image chemistry"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              padding: "15px",
              display: "inline-block",
            }}
          >
            <img src="images/lab-tool.svg" />
          </div>
          <h2>Chemistry</h2>
          <div className="available__courses">
            <span>15 courses available</span>
          </div>
          <div className="ui two column grid">
            <div className="seven wide column">
              <img src="images/Play.svg" />
              <span className="light">25 videos</span>
            </div>
            <div className="nine wide column">
              <img src="images/Test.svg" />
              <span className="light">150 Questions</span>
            </div>
          </div>
          <div className="view__course">
            <a href="#">View Course</a>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="box">
          <div
            className="icon__image english"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              padding: "15px",
              display: "inline-block",
            }}
          >
            <img src="images/Mathematics-Computer-Presentation-Online education-Collage.svg" />
          </div>
          <h2>English</h2>
          <div className="available__courses">
            <span>15 courses available</span>
          </div>
          <div className="ui two column grid">
            <div className="seven wide column">
              <img src="images/Play.svg" />
              <span className="light">25 videos</span>
            </div>
            <div className="nine wide column">
              <img src="images/Test.svg" />
              <span className="light">150 Questions</span>
            </div>
          </div>
          <div className="view__course">
            <a href="#">View Course</a>
          </div>
        </div>
      </div>
    </OwlCarousel>
  );
};

export default Carousel;
