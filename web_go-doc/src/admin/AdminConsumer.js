import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import { firebaseConfig } from "../util/config";
// import Dashboard from "../pages/Dashboard";
import HomeAdmin from "./HomeAdmin";
import ValidateAdmin from "./ValidateAdmin";

class AdminConsumer extends Component {
  render() {
    return (
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return isSignedIn ? <ValidateAdmin user={user} /> : <HomeAdmin />;
          }}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    );
  }
}

export default AdminConsumer;
