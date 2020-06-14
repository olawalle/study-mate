import React, { useContext, useEffect } from "react";

import userIcon from "../../assets/images/user.svg";
import editIcon from "../../assets/images/edit.svg";
import authServices from "../../services/authServices";
import { userContext } from "../../store/UserContext";
import Loader from "../../components/loader/Loader";
import { appUrl } from "../../services/urls";

export default function UserPhoto() {
  const context = useContext(userContext);
  const { updateLoader, loading, user } = context;

  useEffect(() => {
    updateLoader(false);
  }, []);

  const toProfile = (e) => {
    console.log(e.target.files);
    updateLoader(true);
    const selectedFile = e.target.files[0];
    var f = new FormData();
    f.append("file", selectedFile);
    // var body = { file: f };
    authServices
      .uploadFile(f)
      .then((res) => {
        let url = res.data.name;
        console.log(url);
        updateUserPhoto(url);
      })
      .catch((err) => {
        updateLoader(false);
        console.log({ err });
      });
  };

  const updateUserPhoto = (value) => {
    let data = [
      {
        value: value,
        op: "add",
        path: "/image",
      },
    ];
    console.log(data);
    authServices
      .updateUserData(data, user.id)
      .then((res) => {
        console.log(res);
        updateLoader(false);
        let url = res.data.name;
        updateUserPhoto(url);
      })
      .catch((err) => {
        updateLoader(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <div
        className="user-photo"
        style={{
          position: "relative",
          backgroundImage: `url("${appUrl}${user.image}")`,
          backgroundSize: "cover",
        }}
        title="change profile photo"
      >
        {!user.image && (
          <img
            src={userIcon}
            style={{ height: "100%", margin: " 12px auto" }}
            alt=""
          />
        )}
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
          onChange={(e) => toProfile(e)}
        />
      </div>
    </>
  );
}
