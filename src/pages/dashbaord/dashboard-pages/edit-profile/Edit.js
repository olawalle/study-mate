import React, { useState, useContext, useEffect } from "react";
import "./Edit.scss";

import Switch from "react-switch";
import { motion } from "framer-motion";
import Links from "../../../../components/sidebar/Links";
import edit from "../../../../assets/images/edit.svg";
import Nav from "../../../../components/nav/Nav";
import backArrow from "../../../../assets/images/back.svg";
import userIcon from "../../../../assets/images/user.svg";
import editIcon from "../../../../assets/images/edit.svg";
import { withRouter } from "react-router-dom";
import { userContext } from "../../../../store/UserContext";
import UserPhoto from "../../../../components/user-photo/UserPhoto";

export default withRouter(function EditProfile({ history }) {
  const context = useContext(userContext);
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const { user } = context;

  useEffect(() => {
    console.log(user);
    setfullname(`${user.firstName} ${user.surName}`);
    setemail(user.email);
    setphone(user.phoneNumber);
  }, []);
  const [checked, setchecked] = useState(true);

  const handleChange = () => {};

  const back = () => {
    history.push("/dashboard/");
  };

  const toTerms = () => {
    console.log("olo");
    history.push("/terms");
  };

  return (
    <motion.div
      className="edit"
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw" }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Nav />
      <div className="edit-contents">
        <div className="banner">
          <span className="backArrow">
            <img
              src={backArrow}
              height="25"
              className="mr10"
              alt=""
              onClick={back}
              style={{ position: "relative", top: 5, cursor: "pointer" }}
            />
            Edit Profile
          </span>
          <span onClick={back} className="mobile-title-text">
            HOME
          </span>
        </div>
        <div className="contents">
          <div className="user-top">
            <UserPhoto />
          </div>
          <div className="wide">
            <p className="heading">Profile information</p>
            <div className="form">
              <div className="inp-wrap ">
                <span className="label">Full Name</span>
                <input
                  type="text"
                  defaultValue={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                />
                <img src={edit} alt="" />
              </div>

              <div className="inp-wrap left">
                <span className="label">Create Username</span>
                <input type="text" />
                <img src={edit} alt="" />
              </div>

              <div className="inp-wrap right">
                <span className="label">Phone no</span>
                <input
                  type="text"
                  defaultValue={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
                <img src={edit} alt="" />
              </div>

              <div className="inp-wrap left">
                <span className="label">Email address</span>
                <input
                  type="text"
                  defaultValue={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <span className="alert">verify email</span>
              </div>

              <div className="inp-wrap right">
                <span className="label">Location</span>
                <input type="text" />
                <img src={edit} alt="" />
              </div>

              <div className="inp-wrap left">
                <span className="label">Date of birth</span>
                <input type="text" />
              </div>

              <div className="inp-wrap right">
                <span className="label">Password</span>
                <input type="text" />
              </div>

              <button className="tw-btn">Save changes</button>
            </div>
          </div>
          <div className="small">
            <div className="user-btm">
              <UserPhoto />
            </div>
            <p className="heading">General</p>
            <div className="switches">
              <p>
                Sound effects{" "}
                <span>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={25}
                    width={50}
                    className="react-switch"
                  />
                </span>
              </p>
              <p>
                Haptic feedback{" "}
                <span>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={25}
                    width={50}
                    className="react-switch"
                  />
                </span>
              </p>
              <p>
                Motivational messages{" "}
                <span>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={25}
                    width={50}
                    className="react-switch"
                  />
                </span>
              </p>

              <button className="tw-btn">Contact support</button>
              <button className="tw-btn" onClick={toTerms}>
                Terms/Privacy
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
