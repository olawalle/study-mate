import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import UserContextProvider from "./store/UserContext";
import "./App.scss";

// pages
import Signup from "./pages/signup/Signup.js";
import Login from "./pages/login/Login.js";
import Dashboard from "./pages/dashbaord/Dashboard";
import Subject from "./pages/Subject/Subject";

export default function App() {
  useEffect(() => {
    // preload images to reduce weird image load lag after components mount
    // const imagesToBePreloaded = [projectImage1, projectImage2, projectImage3];
    // imagesToBePreloaded.forEach((image) => {
    //   new Image().src = image;
    // });
  }, []);
  return (
    <HashRouter>
      <div className="App">
        <UserContextProvider>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/dashboard/">
              <Dashboard />
            </Route>
            <Route path="/subject/:subject">
              <Subject />
            </Route>
          </Switch>
        </UserContextProvider>
      </div>
    </HashRouter>
  );
}
