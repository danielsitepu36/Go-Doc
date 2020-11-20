import React, { Component, Fragment } from "react";
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
import { Link } from "react-router-dom/";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeNavbar from "../components/layout/HomeNavbar";
import GodocLogo from "../assets/GodocArt.png";
import { Typography } from "@material-ui/core";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <HomeNavbar />
        <div style={{ textAlign: "center" }}>
          <img src={GodocLogo} width="400px" style={{ marginBottom: "30px" }} />
          <Typography variant="h4" align="center">
            Selamat datang di Go-Doc
          </Typography>
          <Button
            style={{
              backgroundColor: "#e00000",
              color: "#fff",
              marginTop: "10px",
            }}
            component={Link}
            to="/dashboard"
          >
            Lanjutkan ke Dashboard
          </Button>
        </div>
      </>
    );
  }
}
export default Home;
