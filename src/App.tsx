import React from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";

import history from "./config/history";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

const App = () => {
  return (
    <Router history={history}>
      {/* index */}
      <Route exact path="/" component={Home}></Route>
      {/* login */}
      <Route path="/login" component={Login}></Route>
      {/* signUp */}
      <Route path="/signUp" component={SignUp}></Route>
    </Router>
  );
};

export default App;
