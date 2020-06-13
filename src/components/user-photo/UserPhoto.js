import React, { useContext } from "react";

import userIcon from "../../assets/images/user.svg";
import editIcon from "../../assets/images/edit.svg";
import authServices from "../../services/authServices";
import { userContext } from "../../store/UserContext";

export default function UserPhoto() {
  const context = useContext(userContext);
  const { updateLoader } = context;
  const toProfile = (e) => {
    console.log(e.target.files);
    updateLoader(true);
    const selectedFile = e.target.files[0];
    var f = new FormData();
    f.append("file", selectedFile);
    var body = { file: f };
    authServices
      .uploadFile(body)
      .then((res) => {
        console.log(res);
        updateLoader(false);
      })
      .catch((err) => {
        updateLoader(false);
        console.log({ err });
      });
  };

  return (
    <div
      className="user-photo"
      style={{ position: "relative" }}
      title="change profile photo"
    >
      <img
        src={userIcon}
        style={{ height: "100%", margin: " 12px auto" }}
        alt=""
      />
      <div className="edit_" onClick={toProfile}>
        <img
          src={editIcon}
          style={{ height: "20px", margin: "10px auto" }}
          alt=""
        />
      </div>
      <input
        type="file"
        style={{
          position: "absolute",
          top: 0,
          opacity: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onChange={toProfile}
      />
    </div>
  );
}
