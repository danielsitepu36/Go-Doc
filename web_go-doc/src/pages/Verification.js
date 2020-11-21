import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import {
  FirestoreProvider,
  FirestoreMutation,
  FirestoreCollection,
  FirestoreDocument,
} from "@react-firebase/firestore";
import { firebaseConfig } from "../util/config";
// import Dashboard from "../pages/Dashboard";
import Dashboard from "./Dashboard";
import Login from "./Login";

class Verification extends Component {
  render() {
    return (
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return isSignedIn ? <Dashboard user={user} /> : <Login />;
          }}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    );
  }
}

export default Verification;
