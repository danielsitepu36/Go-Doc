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
import { Button } from "@material-ui/core";

class Login extends Component {
  render() {
    return (
      <div>
        <HomeNavbar />
        <Button
          style={{
            backgroundColor: "#e00000",
            color: "#fff",
            marginTop: "10px",
          }}
          onClick={async () => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </Button>
        {/* <Button
          style={{
            backgroundColor: "#e00000",
            color: "#fff",
            marginTop: "10px",
            display: "block",
          }}
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </Button> */}
      </div>
      // </FirebaseAuthProvider>
    );
  }
}
export default Login;
