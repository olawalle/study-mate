import React, { useState, useContext } from "react";
import "./Nav.scss";

import userIcon from "../../assets/images/user.svg";
import logo from "../../assets/images/logo.png";

import edit from "../../assets/images/Edit-profile.svg";
import logoutIcon from "../../assets/images/logout.svg";

import caret from "../../assets/images/down-arrow.svg";
import search from "../../assets/images/search.svg";
import { withRouter } from "react-router-dom";
import { userContext } from "../../store/UserContext";
import { appUrl } from "../../services/urls";

export default withRouter(function Nav(props) {
    const context = useContext(userContext);
    const fullname = `${context.user.firstName} ${context.user.surName}`;

    const [open, setopen] = useState(false);
    const [show_nav, setshow_nav] = useState(false);

    const logout = () => {
        context.logout();
        setTimeout(() => {
            props.history.push("/login");
        }, 200);
    };

    const toSubscription = () => {
        props.history.push("/dashboard/subscribe");
    };

    const toHome = () => {
        props.history.push('/');
    }

    const toAuth = (n) => {
        n === 1 ? props.history.push("/login") : props.history.push("/signup");
    };

    const toProfile = () => {
        props.history.push("/edit-profile");
    };

    const goTo = (to) => {
        if (to === "login") props.history.push("/login");
        if (to === "signup") props.history.push("/signup");
        if (to === "home") props.history.push("/dashboard/");
        if (to === "subjects") props.history.push("/dashboard/mobile-courses");
        if (to === "subscribe") props.history.push("/dashboard/subscribe");
        if (to === "edit") props.history.push("/edit-profile");
        if (to === "logout") logout();
        setshow_nav(false);
    };

    return (
        <div className="nav">
            <span className="logo">
                <img onClick={toHome} src={logo} className="logo c-pointer" alt="" />
            </span>

            {!context.isLoggedIn && (
                <span className="user f-right">
                    <span className="login__" onClick={() => goTo("login")}>Login</span>
                    <button
                        onClick={() => goTo("signup")}
                        className="tw-btn ml30 pl20 pr20"
                        style={{ fontWeight: 400 }}
                    >
                        Sign up
          </button>
                </span>
            )}
            {context.isLoggedIn && (
                <span className="user f-right">
                    {
                        !context.user.isSubscribed
                        && <button
                            onClick={toSubscription}
                            className={`${!context.user.isSubscribed ? "redd" : "bluee"}`}
                        >
                            Subscribe
                        </button>
                    }

                    <div className="dropdown-wrap">
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: `url("${appUrl}${
                                    context.user.image && context.user.image.replace("\\", "/")
                                    }")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {!context.user.image && <img src={userIcon} height="30" alt="" />}
                        </div>
                        {fullname}
                        <img
                            src={caret}
                            style={{
                                width: 10,
                                marginLeft: 12,
                                transform: open ? `rotate(180deg)` : "",
                            }}
                            alt=""
                        />
                        <div className="dropdown">
                            <ul>
                                <li className="bb" onClick={toProfile}>
                                    Edit profile <img src={edit} className="f-right m15" alt="" />{" "}
                                </li>
                                <li onClick={logout}>
                                    Logout <img src={logoutIcon} className="f-right m15" alt="" />{" "}
                                </li>
                            </ul>
                        </div>
                    </div>
                </span>
            )}

            {/* {context.isLoggedIn && (
        <span className="inp">
          <img src={search} alt="" />
          <input type="text" placeholder="What do you want learn?" />
        </span>
      )} */}

            <div
                id="nav-icon1"
                onClick={() => setshow_nav(!show_nav)}
                className={show_nav ? "open" : ""}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`mobilenav ${show_nav ? "open" : ""}`}>
                {/* <input type="text" placeholder="What do you want learn?" /> */}

                {/* <p onClick={() => goTo("edit")}>
          <img src={edit} className="logo" alt="" />
          Edit Profile
        </p> */}
                {context.isLoggedIn && <p onClick={() => goTo("home")}>Home</p>}
                {context.isLoggedIn && (
                    <p onClick={() => goTo("subjects")}>Select Subject</p>
                )}
                {context.isLoggedIn && <p onClick={() => goTo("edit")}>Edit Profile</p>}
                {context.isLoggedIn ? (
                    <button onClick={() => goTo("subscribe")} className="tw-btn">
                        Subscribe
                    </button>
                ) : (
                        <>
                            <button className="blue-btn" onClick={() => toAuth(1)}>
                                Login
            </button>
                            <button className="tw-btn" onClick={() => toAuth(2)}>
                                Sign Up
            </button>
                        </>
                    )}
                {context.isLoggedIn && (
                    <p onClick={() => goTo("logout")}>
                        {/* <img src={logoutIcon} className="logo" alt="" /> */}
            Logout
                    </p>
                )}
            </div>
        </div>
    );
});
