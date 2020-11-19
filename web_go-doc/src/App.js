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
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Verification from "./pages/Verification";

class App extends Component {
  render() {
    return (
      <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
        <IfFirebaseAuthed>
          <Dashboard />
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <Home />
        </IfFirebaseUnAuthed>
      </FirebaseAuthProvider>
    );
  }
}

export default App;
