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
import authServices from "../../../../services/authServices";
import Modal from "react-responsive-modal";
import Loader from "../../../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";

export default withRouter(function EditProfile({ history }) {
    const context = useContext(userContext);
    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [phoneNumber, setphone] = useState("");
    const [password, setpassword] = useState("");
    const [code, setcode] = useState("");
    const [username, setusername] = useState("");
    const [location, setlocation] = useState("");
    const [state, setuserstate] = useState("");
    const [dob, setdateOfBirth] = useState("");

    const [modal, setmodal] = useState(false);

    const { user, loading, updateLoader, updateUser } = context;

    useEffect(() => {
        console.log(user);
        setfullname(`${user.firstName} ${user.surName}`);
        setemail(user.email);
        setphone(user.phoneNumber);
        setlocation(user.location);
        setuserstate(user.state);
        let dob = user.dob;
        let reshapedDob = dob ? dob.split("T")[0] : "";
        setdateOfBirth(reshapedDob);
        setusername(user.userName);
    }, []);

    const [checked, setchecked] = useState(true);
    const options = {
        position: "top-right",
    };
    const [openSnackbar, closeSnackbar] = useSnackbar(options);

    const handleChange = () => { };

    const back = () => {
        history.push("/dashboard/profile");
    };

    const getCurrentUser = () => {
        authServices
            .getCurrentUser()
            .then((res) => {
                let user = res.data;
                updateUser(user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toTerms = () => {
        history.push("/terms");
    };

    const toContact = () => {
        history.push("/faq");
    };

    const generateCode = () => {
        updateLoader(true);
        let data = { email, validate: true };
        authServices
            .generateCode(data)
            .then((res) => {
                // setmodal(true);
                openSnackbar(
                    "Please check your email address for instructions to complete your verification",
                    10000
                );
                updateLoader(false);
            })
            .catch((err) => {
                console.log({ err });
                updateLoader(false);
            });
    };

    // const verifyEmail = () => {
    //   authServices
    //     .verifyEmail({ code })
    //     .then((res) => {
    //       updateUser({ ...user, isVerified: true });
    //       setmodal(false);
    //     })
    //     .catch((err) => {
    //       console.log({ err });
    //     });
    // };

    const onCloseModal = () => setmodal(false);

    const updateUserData = () => {
        let obj = {
            firstName: fullname.split(" ")[0],
            surName: fullname.split(" ")[1],
            username,
            location: location,
            phoneNumber,
            dob,
            state: state
        };
        updateLoader(true);
        let data = Object.keys(obj).map((key) => {
            return {
                value: obj[key],
                op: "add",
                path: `/${key}`,
            };
        });
        authServices
            .updateUserData(data, user.id)
            .then((res) => {
                updateLoader(false);
                openSnackbar("Profile updated successfully", 5000);
                getCurrentUser();
            })
            .catch((err) => {
                console.log({ err });
                updateLoader(false);
            });
    };

    

    return (
        <motion.div
            className="edit"
            initial={{ opacity: 0, x: "-5vw" }}
            animate={{ opacity: 1, x: "0vw" }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            {loading && <Loader />}
            <Nav />
            <div className="edit-contents">
                <div className="banner">
                    <span className="backArrow">
                        <svg
                            version="1.1"
                            x="0px"
                            y="0px"
                            height="15"
                            className="mr25"
                            viewBox="0 0 512.005 512.005"
                            onClick={back}
                            style={{
                                transform: "rotate(180deg)",
                                position: "relative",
                                top: "-1px",
                                cursor: "pointer",
                            }}
                        >
                            <g>
                                <g>
                                    <path
                                        fill="#ffffff"
                                        d="M388.418,240.923L153.751,6.256c-8.341-8.341-21.824-8.341-30.165,0s-8.341,21.824,0,30.165L343.17,256.005
                      L123.586,475.589c-8.341,8.341-8.341,21.824,0,30.165c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251
                      l234.667-234.667C396.759,262.747,396.759,249.264,388.418,240.923z"
                                    />
                                </g>
                            </g>
                        </svg>
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
                                <input
                                    type="text"
                                    defaultValue={username}
                                    readOnly={true}
                                />
                                <img src={edit} alt="" />
                            </div>

                            <div className="inp-wrap right">
                                <span className="label">Phone no</span>
                                <input
                                    type="text"
                                    defaultValue={phoneNumber}
                                    onChange={(e) => setphone(e.target.value)}
                                />
                                <img src={edit} alt="" />
                            </div>

                            <div className="inp-wrap left">
                                <span className="label">Email Address</span>
                                <input
                                    type="text"
                                    defaultValue={email}
                                    readOnly={true}
                                />
                                {
                                    !user.isVerified
                                    && 
                                    <span className="alert" onClick={() => generateCode()}>
                                        verify email
                                    </span>
                                }
                                
                            </div>

                            <div className="inp-wrap right">
                                <span className="label">Address</span>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                />
                                <img src={edit} alt="" />
                            </div>

                            <div className="inp-wrap left">
                                <span className="label">Date of birth</span>
                                <input
                                    type="date"
                                    defaultValue={dob}
                                    onChange={(e) => setdateOfBirth(e.target.value)}
                                />
                            </div>

                            <div className="inp-wrap right">
                                <span className="label">State</span>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setuserstate(e.target.value)}
                                />
                            </div>

                            <button className="tw-btn" onClick={updateUserData}>
                                Save changes
              </button>
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

                            <button className="tw-btn" onClick={toContact}>
                                Contact support
              </button>
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
