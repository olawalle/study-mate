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
    subjects: [
      { name: "English", selected: false },
      { name: "Mathematics", selected: false },
      { name: "Biology", selected: false },
      { name: "Chemistry", selected: false },
      { name: "Geography", selected: false },
      { name: "Literature", selected: false },
      { name: "Physics", selected: false },
      { name: "Agric. sci", selected: false },
      { name: "Computer Sci.", selected: false },
      { name: "Creative and cultural art", selected: false },
      { name: "Basic Science", selected: false },
      { name: "Commerce", selected: false },
      { name: "Economics", selected: false },
      { name: "Further Maths", selected: false },
    ],
    token: "",
  };

  componentWillMount() {
    let state = JSON.parse(localStorage.getItem("parentValueKey"));
    console.log(state);
    this.setState(state);
    let token = this.state.user.token || "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("state updated");
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("parentValueKey", JSON.stringify(prevState));
    }
  }

  updateLoader = (loading) => {
    this.setState({ loading });
  };

  updateLoggedInStatus = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  };

  updateUser = (user) => {
    this.setState({ user });
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
    const { updateUser, updateLoader, updateLoggedInStatus, logout } = this;
    return (
      <userContext.Provider
        value={{
          ...this.state,
          updateLoader,
          updateUser,
          updateLoggedInStatus,
          logout,
        }}
      >
        {this.props.children}
      </userContext.Provider>
    );
  }
}
