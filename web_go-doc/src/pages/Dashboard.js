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
import { firebaseConfig } from "../util/config";

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periksa: {},
    };
  }
  render() {
    return (
      <FirestoreProvider {...firebaseConfig} firebase={firebase}>
        <FirestoreCollection path="/periksa/" limit={3}>
          {(d) => {
            return d.isLoading
              ? "Loading"
              : d.value.map((doc) => <div>{doc.idPasien}</div>);
          }}
        </FirestoreCollection>
      </FirestoreProvider>
    );
  }
}

export default Verification;
