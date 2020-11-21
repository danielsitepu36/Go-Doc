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
import GodocArt from "../assets/GodocArt.png";
import GodocLogo from "../assets/GodocLogo.png";
import { Grid, Typography } from "@material-ui/core";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <HomeNavbar />
        <Grid container style={{ padding: "100px" }}>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            style={{ textAlign: "center", margin: "auto" }}
          >
            <img
              alt=""
              src={GodocArt}
              width="500px"
              style={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid
            lg={6}
            md={12}
            sm={12}
            style={{ textAlign: "center", margin: "auto" }}
          >
            <Typography
              variant="h4"
              align="center"
              style={{ color: "#444444" }}
            >
              Halo, Selamat datang di
              <img
                src={GodocLogo}
                width="120px"
                style={{ marginLeft: "10px" }}
              />
            </Typography>
            <Button
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                marginTop: "10px",
                padding: "8px 15px",
                borderRadius: "15px",
              }}
              component={Link}
              to="/dashboard"
            >
              <Typography variant="h6">Mulai Periksa</Typography>
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default Home;
