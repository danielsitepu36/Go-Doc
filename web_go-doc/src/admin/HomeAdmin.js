import React, { Component } from "react";
import firebase from "firebase/app";

// MUI stuff
import Button from "@material-ui/core/Button";
import AdminNavbar from "../components/layout/AdminNavbar";
import GodocArt from "../assets/GodocArt.png";
import GodocLogo from "../assets/GodocLogo.png";
import { Grid, Typography } from "@material-ui/core";

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notAdmin: false,
    };
  }
  render() {
    return (
      <>
        <AdminNavbar />
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
              variant="h5"
              align="center"
              style={{ color: "#444444" }}
            >
              Halo admin, Selamat datang di
              <img
                alt=""
                src={GodocLogo}
                width="150px"
                style={{
                  marginLeft: "10px",
                  verticalAlign: "middle",
                  paddingBottom: "10px",
                }}
              />
            </Typography>
            <Typography variant="h5" style={{ color: "#444444" }}>
              Halaman ini khusus admin
            </Typography>
            <Button
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                marginTop: "10px",
                padding: "8px 15px",
                borderRadius: "15px",
              }}
              onClick={async () => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(googleAuthProvider);
              }}
            >
              <Typography variant="h6">Ke Dashboard</Typography>
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default HomeAdmin;
