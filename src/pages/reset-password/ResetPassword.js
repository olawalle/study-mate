import React, { useState } from "react";
import "../login/Login.scss";

import logo from "../../assets/images/logo.svg";
import dots from "../../assets/images/Dots.svg";
import eye from "../../assets/images/eye.svg";
import pair from "../../assets/images/pair.png";
import { useLocation, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useSnackbar } from "react-simple-snackbar";

import authServices from "../../services/authServices";
import Loader from "../../components/loader/Loader";

const queryparams = (query) => {
    if (query) {
        const readyqueary = query.slice(1).split('&');
        const queryObject = readyqueary.reduce((aggregate, current) => {
            const [key, value] = current.split('=');
            aggregate[key] = value;
            return aggregate;
        }, {})
        return queryObject;
    }
    return undefined
}

export default function ResetPassword() {
    const location = useLocation();
    const history = useHistory();
    const { code = undefined } = queryparams(location.search) || {};
    console.log(code)
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [viewPwrd, setViewPwrd] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const options = {
        position: "top-right",
    };
    const [openSnackbar, closeSnackbar] = useSnackbar(options);
    const pwrdType = viewPwrd ? "text" : "password";

    const handleSnack = (message, duration = 10000) => {
        openSnackbar(
            message,
            duration
        );
    }

    const handleInvalidModel = (model) => {
        const build = Object.entries(model).reduce((aggregate, [key, value]) => {
            aggregate = aggregate.concat(value)
            return aggregate;
        }, []).join(' ')
        return build
    }

    const handleError = (err) => {
        const { status, data } = typeof (err) === "object" && err.response || {};
        if (!status) {
            handleSnack("An unknown error occured at this time. Please try again", 4000);
            return;
        }
        if (status === 404) {
            handleSnack("user not found in our logs. First timer?")
        }
        else if (status === 500) {
            handleSnack("This is an issue from us. Please feel free to report this issue.")
        }
        else {
            const { errors, message } = data;
            if (message) {
                handleSnack(message);
            }
            if (errors) {
                console.log({ errors })
                const buildmessage = handleInvalidModel(errors)
                handleSnack(buildmessage);
            }
        }
    }


    const login = () => {
        history.push('/login')
    }

    const resetPassword = (e, email, newPassword, confirmNewPassword) => {
        e.preventDefault();
        if (!code) {
            handleSnack("You are making an invalid request to us", 5000);
            return;
        }
        const data = { email, newPassword, confirmNewPassword }
        setLoading(true);
        authServices
            .forgotPassword(data, code)
            .then((res) => {
                // setmodal(true);
                openSnackbar(
                    "Please log back in, your password has been changed",
                    10000
                );
                setLoading(false);
                setSuccess(true);
            })
            .catch((err) => {
                handleError(err);
                console.log({ err });
                setLoading(false);
            });
        console.log({data})
    }




    return (
        <>
            {loading && <Loader />}
            <motion.div
                className="login"
                initial={{ opacity: 0, x: "-5vw" }}
                animate={{ opacity: 1, x: "0vw" }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="left-side">
                    <img
                        src={logo}
                        alt=""
                        style={{ width: 170, position: "absolute", top: 50, left: 50 }}
                    />

                    <img src={dots} className="left-dot" alt="" />
                    <img src={dots} className="right-dot" alt="" />

                    <img src={pair} className="pair" alt="" />
                </div>
                    <div className="right-side">
                        <p style={{ fontSize: 24, fontWeight: "600", marginTop: 100 }}>
                            Forgot Password
                        </p>
                        <div className="form">
                            {!success ? (
                            <>
                                <span className="label">Email Address</span>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="inp-wrap">
                                    <span className="label">New password</span>
                                    <input
                                        type={pwrdType}
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                </div>
                                <div className="inp-wrap">
                                    <span className="label">Confirm new password</span>
                                    <input
                                        type={pwrdType}
                                        value={confirmPassword}
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                    />
                                </div>
                                <span
                                    className="no-acct"
                                    style={{
                                        fontSize: 12,
                                        cursor: "pointer",
                                        float: "right",
                                    }}
                                    onClick={() => setViewPwrd(!viewPwrd)}
                                >
                                    <span className="blue--text">{viewPwrd ? "hide password" : "show password"}</span>
                                </span>
                                <button disabled={!(password && password === confirmPassword)} className="main-btn mt30"
                                    onClick={(e) => resetPassword(e, email, password, confirmPassword)}>
                                        Reset
                                </button>
                                </>
                            ) : (
                                    <div>
                                        <p>You all good to go! Please login.</p>
                                    </div>
                                )}
                            <span
                                className="no-acct"
                                style={{
                                    fontSize: 12,
                                    position: "relative",
                                    top: 10,
                                    cursor: "pointer",
                                    float: "right",
                                }}
                                onClick={login}
                            >
                                Back to <span className="blue--text">login</span>
                            </span>
                        </div>
                        <p className="cc" style={{ position: "absolute", bottom: 20 }}>
                            Copyright &copy; 2020 InfoMall Ltd. All rights reserved.
            </p>
                    </div>
            </motion.div>
        </>
    );
};
