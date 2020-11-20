import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import { firebaseConfig } from "./util/config";

// Components
import Navbar from "./components/layout/HomeNavbar";
import Dashboard from "./template/Dashboard";
import Home from "./pages/Home";
import Verification from "./pages/Verification";
import Login from "./pages/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  render() {
    return (
      <Router>
        <div style={{ marginTop: 80 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Verification} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
