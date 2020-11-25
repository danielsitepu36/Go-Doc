import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import { firebaseConfig } from "../util/config";
import Login from "./Login";
import Validation from "./Validation";

class AuthConsumer extends Component {
  render() {
    return (
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return isSignedIn ? <Validation user={user} /> : <Login />;
          }}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    );
  }
}

export default AuthConsumer;
