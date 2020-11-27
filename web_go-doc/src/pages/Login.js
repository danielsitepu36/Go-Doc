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
            item
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
                  fontWeight: "bold",
                }}
              >
                Silakan masuk untuk melanjutkan
              </Typography>
              <Typography
                variant="body1"
                align="center"
                style={{
                  color: "#444444",
                  textAlign: "left",
                }}
              >
                Aplikasi web ini ditujukan untuk dokter
              </Typography>
              <Typography
                variant="body1"
                align="center"
                style={{
                  color: "#444444",
                  textAlign: "left",
                }}
              >
                Apabila anda adalah pasien, silakan mendownload aplikasi mobile
                kami
              </Typography>
              <div
                style={{
                  margin: "10px 0 30px 0",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#e00000",
                    color: "#fff",
                    margin: "0 10px 10px 0",
                    padding: "8px 15px",
                    borderRadius: "15px",
                  }}
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/drive/folders/1zvykYsIjW1EKWF2bp9Z_bN_Cw8xprzR4?usp=sharing",
                      "_blank"
                    )
                  }
                >
                  <Typography variant="h6">Download Aplikasi</Typography>
                </Button>
                <Button
                  style={{
                    backgroundColor: "#e00000",
                    color: "#fff",
                    margin: "0 10px 10px 0",
                    padding: "8px 15px",
                    borderRadius: "15px",
                  }}
                  onClick={async () => {
                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                    await firebase.auth().signInWithPopup(googleAuthProvider);
                  }}
                >
                  <Typography variant="h6">Login Sebagai Dokter</Typography>
                </Button>
              </div>
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
