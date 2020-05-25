import React, { useState } from "react";
import "./Lesson.scss";

import play from "../../assets/images/play.svg";
import Modal from "react-responsive-modal";

export default function Lesson() {
  const [open, setopen] = useState(false);
  return (
    <div className="lesson-wrap">
      <div className="lesson" onClick={() => setopen(!open)}>
        <p>
          <img src={play} width="15" className="mr15 mt5" alt="" />
          Mathematics quiz 1
        </p>
      </div>

      <Modal
        open={open}
        onClose={() => setopen(!open)}
        center
        style={{ width: "80%" }}
      >
        <iframe
          src="https://www.youtube.com/embed/E7wJTI-1dvQ"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          style={{
            width: "100%",
            height: "600px",
          }}
        />
        <div className="info" style={{ padding: 30, height: 100 }}>
          <span className="blue--text mt10">Brief history of Mathematics</span>
          <button className="f-right tw-btn" style={{ padding: "12px 30px" }}>
            Next video
          </button>
        </div>
      </Modal>
    </div>
  );
}
