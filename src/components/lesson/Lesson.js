import React, { useState } from "react";
import "./Lesson.scss";

import play from "../../assets/images/play.svg";
import Modal from "react-responsive-modal";
import { withRouter } from "react-router-dom";

import icn from "../../assets/images/dashboard.svg";
import listener from "../../assets/images/Listener.svg";
import streak from "../../assets/images/streak.svg";

export default withRouter(function Lesson({ disableClick, history }) {
  const [open, setopen] = useState(false);
  const [videos, setVideos] = useState([
    { text: "Making picture graphs and line plots", selected: true },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
    { text: "Making picture graphs and line plots", selected: false },
  ]);

  const selectVideo = (i) => {
    setVideos(
      videos.map((v, j) => {
        return i === j
          ? {
              ...v,
              selected: true,
            }
          : {
              ...v,
              selected: false,
            };
      })
    );
  };

  const openModal = () => {
    disableClick ? history.push("/subject/mathematics") : setopen(!open);
  };

  return (
    <div className="lesson-wrap">
      <div className="lesson" onClick={openModal}>
        <p>
          <img src={play} width="25" className="mr15 mt5" alt="" />
          <span>Mathematics quiz 1</span>
        </p>
      </div>

      <Modal
        className="video-modal"
        open={open}
        onClose={() => setopen(!open)}
        center
        showCloseIcon={false}
        styles={{ modal: { width: "96%" } }}
      >
        <div className="video-modal">
          <div className="streak">
            <img src={streak} alt="" />
            <div className="streak-text">
              <p className="top">Great Listener</p>
              <p style={{ fontSize: 12 }}>
                You have watched 30 minutes of video in a single topic
              </p>
            </div>
          </div>
          <div className="videos">
            <div
              style={{ fontWeight: 600, fontSize: 16, padding: "20px 40px" }}
            >
              Intermediate
            </div>
            <div
              style={{ padding: "0 40px 30px", borderBottom: "1px solid #eee" }}
            >
              <div
                className="tag"
                style={{
                  display: "inline-block",
                  width: "33%",
                  color: "#717171",
                  fontSize: 12,
                }}
              >
                <img src={icn} width="12" alt="" /> 100 videos
              </div>
              <div
                className="tag"
                style={{
                  display: "inline-block",
                  width: "33%",
                  color: "#717171",
                  fontSize: 12,
                }}
              >
                <img src={icn} width="12" alt="" /> 18 Topics
              </div>
              <div
                className="tag"
                style={{
                  display: "inline-block",
                  width: "33%",
                  color: "#717171",
                  fontSize: 12,
                }}
              >
                <img src={icn} width="12" alt="" /> 1hr 30mins
              </div>
            </div>

            <ul
              style={{
                padding: 0,
                overflow: "auto",
                height: "calc(90vh - 125px)",
              }}
            >
              {videos.map((video, i) => {
                return (
                  <li
                    onClick={() => selectVideo(i)}
                    style={{
                      padding: "15px 40px",
                      cursor: "pointer",
                      fontSize: 14,
                      listStyle: "none",
                      color: video.selected ? "#fff" : "#000",
                      backgroundColor: video.selected ? "#10A3FF" : "#fff",
                    }}
                  >
                    <img
                      src={play}
                      style={{
                        width: 25,
                        marginRight: 12,
                        position: "relative",
                        top: "3px",
                      }}
                      alt=""
                    />
                    <span style={{ position: "relative", top: "-5px" }}>
                      {video.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="frame">
            <iframe
              src="https://www.youtube.com/embed/E7wJTI-1dvQ"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              style={{ width: "100%", height: "calc(90vh - 90px)" }}
            />
            <div
              className="info"
              style={{ padding: 20, width: "100%", height: 80 }}
            >
              <span
                className="blue--text mt10 video-name"
                style={{ fontWeight: 600, position: "relative", top: "5px" }}
              >
                Brief history of Mathematics
              </span>
              <button
                className="f-right tw-btn"
                style={{ padding: "12px 30px" }}
              >
                Next video
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});
