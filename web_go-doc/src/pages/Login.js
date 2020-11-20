import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import {
  FirestoreProvider,
  FirestoreMutation,
  FirestoreCollection,
  FirestoreDocument,
} from "@react-firebase/firestore";
import { firebaseConfig, auth, db } from "../util/config";
import HomeNavbar from "../components/layout/HomeNavbar";

class Login extends Component {
  render() {
    return (
      <div>
        <HomeNavbar />
        <button
          onClick={async () => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
      </div>
      // </FirebaseAuthProvider>
    );
  }
}
export default Login;
