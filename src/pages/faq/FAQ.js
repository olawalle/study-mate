import React, { useContext, useState } from "react";
import "./faq.scss";
import { motion } from "framer-motion";
import Nav from "../../components/nav/Nav";
import Loader from "../../components/loader/Loader";
import backArrow from "../../assets/images/back.svg";
import plus from "../../assets/images/more.svg";
import { userContext } from "../../store/UserContext";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import authServices from "../../services/authServices";

export default withRouter(function FAQ({ history }) {
    const context = useContext(userContext);
    const { user, loading, updateLoader } = context;
    const [subject, setsubject] = useState("");
    const [message, setmessage] = useState("");

    const [faqs, setfaqs] = useState([
        {
            title: "Q. What are Badges?",
            text: `
      Incentives used to encourage students for mastery and practice, completion of missions, as well as for participating positively in the StudyMate community`,
            open: false,
        },
        {
            title: "Q. What do I expect to see in my profile?",
            text: `
      This is where a student goes to take pride in viewing all of their progress on StudyMate! Provides a dashboard of progress, points, badges, leaderboard and more. Students also find their active subscription here`,
            open: false,
        },
        {
            title: "Q. What is a Streak? ",
            text: `
      It is a reward for persistence in studying, using our platform!  StudyMate rewards students with points for a streak of questions answered correctly, and continuous days of work.`,
            open: false,
        },
        {
            title: "Q. How many learning Videos does StudyMate have?",
            text: `
      StudyMate has 1,000+ instructional videos, including over 100 math videos tightly aligned with the NERDC curriculum, covering early math to senior secondary.`,
            open: false,
        },
        {
            title: "Q. What are Study Packs?",
            text: `
      StudyMate designed its practice questions according to packs. Each pack is designed with over 50 unique questions`,
            open: false,
        },
        {
            title: "Q. What happens in the Test section?",
            text: `
      StudyMate allows users to test their skills with over 10,000 practice questions in the test section. These practice questions can help you develop on your learning outcome and show you your progress`,
            open: false,
        },
        {
            title: "Q. Are there levels for different learners on StudyMate?",
            text: `
      Yes.
        There is the beginner, intermediate and advanced level, each level with different video packs and questions following.`,
            open: false,
        },
    ]);

    const back = () => {
        history.goBack();
    };

    const openFaq = (i) => {
        setfaqs(
            faqs.map((f, j) => {
                return i === j
                    ? {
                        ...f,
                        open: !f.open,
                    }
                    : {
                        ...f,
                    };
            })
        );
    };
    const snackOptions = {
        position: "top-right",
    };
    const [openSnackbar, closeSnackbar] = useSnackbar(snackOptions);
    const handleSnack = (message, duration = 5000) => {
        openSnackbar(message, duration);
    };
    const handleInvalidModel = (model) => {
        const build = Object.entries(model)
            .reduce((aggregate, [key, value]) => {
                aggregate = aggregate.concat(value);
                return aggregate;
            }, [])
            .join(" ");
        return build;
    };

    const handleError = (err) => {
        const { status, data } = (typeof err === "object" && err.response) || {};
        if (!status) {
            handleSnack(
                "An unknown error occured at this time. Please try again",
                4000
            );
            return;
        }
        if (status === 404) {
            handleSnack("user not found in our logs. First timer?");
        } else if (status === 500) {
            handleSnack(
                "This is an issue from us. Please feel free to report this issue."
            );
        } else {
            const { errors, message } = data;
            if (message) {
                handleSnack(message);
            }
            if (errors) {
                console.log({ errors });
                const buildmessage = handleInvalidModel(errors);
                handleSnack(buildmessage);
            }
        }
    };

    const onSubmitFeedback = () => {
        if (subject && message) {
            const feedbackData = {
                message: message,
                subject: subject,
                userId: user.id,
            };
            updateLoader(true);
            authServices
                .postFeedback(feedbackData)
                .then((res) => {
                    console.log({ feedback: res.data });
                    handleSnack("Feedback successfully sent.");
                    updateLoader(false);
                    setmessage("")
                    setsubject("")
                })
                .catch((err) => {
                    console.log({ err });
                    handleError(err);
                    updateLoader(false);
                });
        }
    };

    return (
        <motion.div
            className="faq"
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
            Support
          </span>
                    <span onClick={back} className="mobile-title-text">
                        HOME
          </span>
                </div>
                <div className="contents">
                    <p className="title">How can we help you?</p>
                    <input type="text" value={subject} placeholder="Subject" onChange={({ target: { value } }) => setsubject(value)} />
                    <textarea name="" id="" value={message} placeholder="Message" onChange={({ target: { value } }) => setmessage(value)} cols="30" rows="10"></textarea>
                    <button className="tw-btn submit" onClick={onSubmitFeedback}>SUBMIT</button>
                    <br />
                    <div className="questions">
                        <p className="title blue--text">
                            <b>Frequently asked questions(FAQ's)</b>
                        </p>
                        <p className="sub">
                            Frequently asked questions (FAQ) or Questions and Answers (Q & A),
                            are listed questions and answers, all supposed to be asked in
                            some context.
            </p>

                        {faqs.map((faq, i) => (
                            <div className="accordion" key={faq.text}>
                                <div className="top" onClick={() => openFaq(i)}>
                                    <p
                                        style={{
                                            display: "inline-block",
                                            width: "90%",
                                            lineHeight: "20px",
                                        }}
                                    >
                                        {faq.title}
                                    </p>
                                    <img
                                        src={plus}
                                        width="20"
                                        style={{
                                            float: "right",
                                            position: "relative",
                                            right: "15px",
                                            top: "12px",
                                            display: "inline-block",
                                        }}
                                        alt=""
                                    />
                                </div>
                                <div className={`btm ${faq.open ? "open" : ""}`}>
                                    {faq.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="band">
                    2020 All right reserved. StudyMate
          <p style={{ margin: "4px 0" }}>Powered by infomall</p>
                </div>
            </div>
        </motion.div>
    );
});
