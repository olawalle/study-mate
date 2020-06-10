import React, { useState, useContext, useEffect } from "react";
import "./Lesson.scss";

import play from "../../assets/images/play.svg";
import playIcn from "../../assets/images/play-button.svg";
import close from "../../assets/images/close.svg";
import Modal from "react-responsive-modal";
import { withRouter } from "react-router-dom";

import icn from "../../assets/images/dashboard.svg";
import clock from "../../assets/images/clock.svg";
import listener from "../../assets/images/Nice-listener.svg";
import streak from "../../assets/images/streak.svg";
import { appUrl } from "../../services/urls";
import { userContext } from "../../store/UserContext";

export default withRouter(function Lesson({ disableClick, history, video }) {
  const context = useContext(userContext);
  const { selectedSubject } = context;
  const duration = selectedSubject.videos.reduce(
    (sum, vid) => (sum += vid.duration),
    0
  );
  const timeFrame = `${Math.floor(duration / 60)}hrs ${duration % 60}mins`;
  useEffect(() => {
    setVideos(
      selectedSubject.videos.map((vid) => {
        return {
          ...vid,
          text: vid.name,
          selected: vid.id === video.id,
        };
      })
    );
  }, []);
  const [open, setopen] = useState(false);
  const [showStreak, setshowStreak] = useState(false);
  const [url, seturl] = useState("");
  const [videos, setVideos] = useState([]);

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

  const openModal = (url) => {
    if (disableClick) {
      history.push("/subject/mathematics");
    } else {
      setopen(!open);
      seturl(url);
    }
  };

  return (
    <div className="lesson-wrap">
      <div className="lesson" onClick={() => openModal(video.url)}>
        <p>
          <img src={play} width="25" className="mr15 mt5" alt="" />
          <span>{video.name}</span>
        </p>
      </div>

      <Modal
        open={open}
        onClose={() => setopen(!open)}
        center
        showCloseIcon={false}
        styles={{ modal: { width: "96%" } }}
        closeOnOverlayClick={false}
      >
        <div className="video-modal">
          {showStreak && (
            <div className="streak">
              <img src={streak} alt="" />
              <div className="streak-text">
                <p className="top">Great Listener</p>
                <p style={{ fontSize: 12 }}>
                  You have watched 30 minutes of video in a single topic
                </p>
              </div>
            </div>
          )}
          <div className="videos">
            <div
              style={{ fontWeight: 600, fontSize: 20, padding: "30px 40px" }}
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
                  width: "50%",
                  color: "#717171",
                  fontSize: 14,
                }}
              >
                <img
                  src={playIcn}
                  width="15"
                  alt=""
                  style={{ marginRight: 4, position: "relative", top: 3 }}
                />{" "}
                {videos.length} videos
              </div>
              {/* <div
                className="tag"
                style={{
                  display: "inline-block",
                  width: "33%",
                  color: "#717171",
                  fontSize: 12,
                }}
              >
                <img src={icn} width="12" alt="" /> 18 Topics
              </div> */}
              <div
                className="tag"
                style={{
                  display: "inline-block",
                  width: "50%",
                  color: "#717171",
                  fontSize: 12,
                }}
              >
                <img
                  src={clock}
                  width="15"
                  alt=""
                  style={{ marginRight: 4, position: "relative", top: 3 }}
                />{" "}
                {timeFrame}
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
                    key={video.text}
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
            <video
              style={{ width: "100%", height: "calc(90vh - 90px)" }}
              controls
              autoPlay={true}
            >
              <source
                src={`${appUrl}${url}`}
                type="video/mp4"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              ></source>
            </video>
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
            <span className="close">
              <img
                src={close}
                alt=""
                onClick={() => setopen(false)}
                style={{
                  width: "20px",
                  float: "right",
                  marginTop: "15px",
                  marginRight: 20,
                  cursor: "pointer",
                  position: "absolute",
                  top: 12,
                  right: 2,
                }}
              />
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
});
