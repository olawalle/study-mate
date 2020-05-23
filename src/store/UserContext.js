import React, { createContext, Component } from "react";
export const userContext = createContext();

export default class UserContextProvider extends Component {
  state = {
    user: {
      fullname: "Olawale Ariyo",
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
  };
  render() {
    return (
      <userContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}
