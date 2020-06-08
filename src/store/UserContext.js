import React, { createContext, Component } from "react";
import axios from "axios";
export const userContext = createContext();

export default class UserContextProvider extends Component {
  state = {
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
      level: 2,
    },
    selectedSubject: {},
    subjects: [],
    userCourses: [],
    token: "",
  };

  componentWillMount() {
    let state = JSON.parse(localStorage.getItem("parentValueKey"));
    console.log(state);
    this.setState(state);
    let token = this.state.user.token || "";
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("parentValueKey", JSON.stringify(this.state));
    } else {
      localStorage.setItem("parentValueKey", JSON.stringify(prevState));
    }
  }

  saveSelectedSubject = (selectedSubject) => this.setState({ selectedSubject });

  updateLoader = (loading) => {
    this.setState({ loading });
  };

  updateLoggedInStatus = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  };

  updateUser = (user) => {
    this.setState({ user });
  };

  updateUserCourses = (userCourses) => {
    let subjectObj = this.state.subjects.reduce((pay, subj) => {
      pay[subj.id] = subj;
      return pay;
    }, {});
    console.log({ subjectObj });
    this.setState({
      userCourses: userCourses.map((course) => {
        return {
          ...course,
          name: subjectObj[course.learnCourseId].name,
        };
      }),
    });
  };

  updateSubjects = (subjects) => {
    this.setState({ subjects });
  };

  logout = () => {
    this.setState({
      isLoggedIn: false,
      loading: false,
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
    });
  };

  render() {
    const {
      updateUser,
      updateLoader,
      updateLoggedInStatus,
      logout,
      updateSubjects,
      saveSelectedSubject,
      updateUserCourses,
    } = this;
    return (
      <userContext.Provider
        value={{
          ...this.state,
          updateLoader,
          updateUser,
          updateLoggedInStatus,
          logout,
          updateSubjects,
          updateUserCourses,
          saveSelectedSubject,
        }}
      >
        {this.props.children}
      </userContext.Provider>
    );
  }
}
