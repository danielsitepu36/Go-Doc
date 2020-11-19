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
  render() {
    return (
      <FirestoreProvider {...firebaseConfig} firebase={firebase}>
        <FirestoreMutation
          type="set"
          path="/dokter/oDHVGiVjGBM9KSmzTm7DKLmsV8p1"
        >
          {({ runMutation }) => {
            return (
              <div>
                <h2> Mutate state </h2>
                <button
                  onClick={async () => {
                    runMutation({
                      nowOnCli: Date.now(),
                      nowOnServer: await firebase.firestore.FieldValue.serverTimestamp(),
                    }).then((res) => {
                      console.log("Ran mutation ", res);
                    });
                  }}
                >
                  Mutate Set
                </button>
              </div>
            );
          }}
        </FirestoreMutation>
        {/* <FirestoreDocument path="/dokter/oDHVGiVjGBM9KSmzTm7DKLmsV8p1">
              {(d) => {
                const bookmark = d.value;
                console.log(bookmark);
              }}
            </FirestoreDocument> */}
      </FirestoreProvider>
    );
  }
}

export default Verification;
