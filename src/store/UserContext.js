import React, { createContext, Component } from "react";
import axios from "axios";
import * as JwtDecode from "jwt-decode";
export const userContext = createContext();

export default class UserContextProvider extends Component {
  state = {
    fixBack: false,
    testId_: 0,
    loading: false,
    isLoggedIn: false,
    stateCounter: 0,
    user: {
      email: "",
      firstName: "",
      id: null,
      image: null,
      phoneNumber: "",
      role: 0,
      sex: 0,
      surName: "",
      level: 2,
    },
    selectedSubject: {},
    subjects: [],
    userCourses: [],
    awards: [],
    userAwards: [],
    token: "",
    studyPacks: [],
    quizzes: [],
  };

  componentWillMount() {
    let state = JSON.parse(localStorage.getItem("parentValueKey"));
    this.setState(state);
    let token = this.state.user.token || "";
    axios.defaults.headers.common["Authorization"] = `${token}`;
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      console.log("not equal", this.state.isLoggedIn);
      localStorage.setItem("parentValueKey", JSON.stringify(this.state));
    } else {
      console.log("equal", this.state.isLoggedIn);
      localStorage.setItem("parentValueKey", JSON.stringify(prevState));
    }
  }

  saveSelectedSubject = (selectedSubject) => this.setState({ selectedSubject });

  updateLoader = (loading) => {
    this.setState({ loading });
    };

    updateCounter = () => {
        this.setState({ stateCounter: this.state.stateCounter++ });
    };

  updateTestId = (testId_) => {
    this.setState({ testId_ });
  };

  updatefixBack = (fixBack) => {
    this.setState({ fixBack });
  };

  updateLoggedInStatus = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  };

  updateStudyPack = (studyPacks) => this.setState({ studyPacks });
  updateStudyPackQuizes = (quizzes) => this.setState({ quizzes });

  updateUser = (user) => {
    this.setState({ user });
  };

  updateUserCourses = (userCourses) => {
    let subjectObj = this.state.subjects.reduce((pay, subj) => {
      pay[subj.id] = subj;
      return pay;
    }, {});
    let fullCourses = userCourses.map((course) => {
      return {
        ...course,
        name: subjectObj[course.learnCourseId]
          ? subjectObj[course.learnCourseId].name
          : "",
      };
    });
    console.log({ subjectObj, fullCourses });
    this.setState({
      userCourses: fullCourses,
    });
  };

  getUser = () => {
    if (localStorage) {
      const token = localStorage.getItem("studymate-token");
      if (token) {
        const decoded = JwtDecode(token);
        return decoded;
      }
    }
    return {};
  };

  updateAwards = (awards) => this.setState({ awards });

  updateUserAwards = (userAwards) => this.setState({ userAwards });

  updateSubjects = (subjects) => {
    this.setState({ subjects });
  };

  logout = () => {
    this.setState({
      loading: false,
      isLoggedIn: false,
      user: {
        email: "",
        firstName: "",
        id: null,
        image: null,
        phoneNumber: "",
        role: 0,
        sex: 0,
        surName: "",
        level: null,
      },
      selectedSubject: {},
      subjects: [],
      userCourses: [],
      awards: [],
      userAwards: [],
      token: "",
      studyPacks: [],
      quizzes: [],
    });
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
    }, 1000);
  };

  render() {
      const {
          updateCounter,
      updateUser,
      updateLoader,
      updateLoggedInStatus,
      logout,
      updateTestId,
      updateSubjects,
      saveSelectedSubject,
      updateUserCourses,
      updateAwards,
      updateUserAwards,
      updateStudyPack,
      updateStudyPackQuizes,
      updatefixBack,
    } = this;
    const modState = {
      ...this.state,
      user: { ...this.state.user, ...this.getUser() },
    };
    return (
      <userContext.Provider
        value={{
          ...modState,
          updateLoader,
                updateUser,
                updateCounter,
          updateLoggedInStatus,
          logout,
          updateTestId,
          updateSubjects,
          updateUserCourses,
          saveSelectedSubject,
          updateAwards,
          updateUserAwards,
          updateStudyPack,
          updateStudyPackQuizes,
          updatefixBack,
        }}
      >
        {this.props.children}
      </userContext.Provider>
    );
  }
}
