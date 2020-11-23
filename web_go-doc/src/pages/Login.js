import React, { Component } from "react";
import firebase from "firebase/app";
import HomeNavbar from "../components/layout/HomeNavbar";
import { Button, Grid, Typography } from "@material-ui/core";

import GodocArt from "../assets/GodocArt2.png";

class Login extends Component {
  render() {
    return (
      <div>
        <HomeNavbar />
        <Grid container style={{ padding: "100px" }}>
          <Grid
            lg={6}
            md={12}
            sm={12}
            style={{ textAlign: "center", margin: "auto" }}
          >
            <div
              style={{
                textAlign: "left",
                marginLeft: "50px",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                style={{
                  color: "#444444",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Anda belum masuk,
              </Typography>
              <Typography
                variant="h4"
                align="center"
                style={{
                  color: "#444444",
                  textAlign: "left",
                }}
              >
                Silakan masuk untuk melanjutkan
              </Typography>

              <Button
                style={{
                  backgroundColor: "#e00000",
                  color: "#fff",
                  margin: "10px 0 30px 0",
                  padding: "8px 15px",
                  borderRadius: "15px",
                }}
                onClick={async () => {
                  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                  await firebase.auth().signInWithPopup(googleAuthProvider);
                }}
              >
                <Typography variant="h6">Login Dengan Google</Typography>
              </Button>
            </div>
          </Grid>
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
        </Grid>
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
