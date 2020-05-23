import React from "react";
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

export default function App() {
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
          </Switch>
        </UserContextProvider>
      </div>
    </HashRouter>
  );
}
