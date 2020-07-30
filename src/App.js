import React, { useEffect, useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    HashRouter,
    withRouter,
    useHistory,
    Redirect,
    useParams,
    useLocation,
} from "react-router-dom";
import UserContextProvider, { userContext } from "./store/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import "./App.scss";
import SnackbarProvider from "react-simple-snackbar";

// pages
import Signup from "./pages/signup/Signup.js";
import Login from "./pages/login/Login.js";
import Dashboard from "./pages/dashbaord/Dashboard";
import Subject from "./pages/Subject/Subject";

import play from "./assets/images/play.svg";
import Learn from "./assets/images/Learn.svg";
import Progress from "./assets/images/Progress.svg";
import Profile from "./assets/images/Profile.svg";
import userIcon from "./assets/images/user.svg";
import logo from "./assets/images/logo.png";
import edit from "./assets/images/Edit-profile.svg";
import logoutIcon from "./assets/images/logout.svg";
import caret from "./assets/images/down-arrow.svg";
import students from "./assets/images/students.png";
import editIcon from "./assets/images/edit.svg";
import coins from "./assets/images/coins.svg";
import trophy from "./assets/images/Trophy.svg";
import Badge1 from "./assets/images/Badge1.svg";
import Badge2 from "./assets/images/Badge2.svg";
import Medal from "./assets/images/Medal.svg";
import dots from "./assets/images/Dots.svg";
import facebook from "./assets/images/facebook.svg";
import google from "./assets/images/google.svg";
import twitter from "./assets/images/twitter.svg";
import quizPic from "./assets/images/Quiz-character.svg";
import flex from "./assets/images/flex1.png";
import flex2 from "./assets/images/Slide-Image-2.png";
import flex3 from "./assets/images/Slide-Image-3.png";
import logo2 from "./assets/images/logo.svg";
import bg1 from "./assets/images/Signup Background.svg";
import bg2 from "./assets/images/Login Background.svg";
import student from "./assets/images/student.png";
import teacher from "./assets/images/teacher.png";
import EditProfile from "./pages/dashbaord/dashboard-pages/edit-profile/Edit";
import Studypack from "./pages/Studypack/Studypack";
import authServices from "./services/authServices";
import Terms from "./pages/Terms/Terms";
import FAQ from "./pages/faq/FAQ";
import Privacy from "./pages/Terms/Privacy";
import Verify from "./pages/Verify";
import PreviewSubject from "./pages/Subject/PreviewSubject";
import LandingPage from "./pages/Landingpage/Landingpage";
import ResetPassword from "./pages/reset-password/ResetPassword";

export const PreFooter = () => {
    return (
        <div className="pre-footer bordered">
            <span>@2020 All Rights Reserved. Studymate</span>
            <span>Powered by InfoMall Nigeria</span>
        </div>
    );
};

export default function App() {
    let history = useHistory();
    let route = useLocation();
    console.log("route is", route);
    const {
        user, isLoggedIn
    } = useContext(userContext);
    useEffect(() => {
        // let token = localStorage.getItem("studymate-token");
        // !token && history.push("/login");

        // preload images to reduce weird image load lag after components mount
        const imagesToBePreloaded = [
            play,
            Learn,
            Progress,
            Profile,
            userIcon,
            logo,
            edit,
            logoutIcon,
            caret,
            students,
            editIcon,
            coins,
            trophy,
            Badge1,
            Badge2,
            Medal,
            dots,
            facebook,
            google,
            twitter,
            quizPic,
            flex,
            flex2,
            flex3,
            logo2,
            bg1,
            bg2,
            student,
            teacher,
        ];
        imagesToBePreloaded.forEach((image) => {
            new Image().src = image;
        });
    }, []);

    const redirectPath = `/login?redirect=${route.pathname}`;
    return (
        <AnimatePresence exitBeforeEnter>
            <Switch match>

                <Route path="/verifyemail">
                    {
                        user && isLoggedIn
                            ? <Verify />
                            : <Redirect to={redirectPath} />
                    }
                </Route>
                <Route path="/login">
                    {
                        user && isLoggedIn
                            ? <Redirect to='/dashboard' />
                            : <Login />
                    }
                </Route>
                <Route path="/forgotpassword">
                    {
                        user && isLoggedIn
                            ? <Redirect to='/dashboard' />
                            : <ResetPassword />
                    }

                </Route>
                <Route exact strict path="/">
                    {
                        user && isLoggedIn
                            ? <Redirect to='/dashboard' />
                            : <LandingPage />
                    }
                </Route>
                <Route path="/signup">
                    {
                        user && isLoggedIn
                            ? <Redirect to={redirectPath} />
                            : <Signup />
                    }

                </Route>
                <Route path="/dashboard/">
                    {
                        user && isLoggedIn
                            ? <Dashboard />
                            : <Redirect to={redirectPath} />
                    }

                </Route>
                <Route path="/subject/:subject/:level">
                    {
                        user && isLoggedIn
                            ? <Subject />
                            : <Redirect to={redirectPath} />
                    }

                </Route>
                <Route path="/preview-subject/:subject">
                    <PreviewSubject />
                </Route>
                <Route path="/studypack/:subject">
                    {
                        user && isLoggedIn
                            ? <Studypack />
                            : <Redirect to={redirectPath} />
                    }
                </Route>
                <Route path={`/edit-profile`}>
                    {
                        user && isLoggedIn
                            ? <EditProfile />
                            : <Redirect to={redirectPath} />
                    }
                </Route>
                <Route path={`/terms`}>
                    <Terms />
                </Route>
                <Route path={`/privacy`}>
                    <Privacy />
                </Route>
                <Route path={`/faq`}>
                    <FAQ />
                </Route>
            </Switch>
        </AnimatePresence>
    );
}
