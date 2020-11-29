import React, { Component } from "react";
import { Link } from "react-router-dom/";

// MUI stuff
import Button from "@material-ui/core/Button";
import HomeNavbar from "../components/layout/HomeNavbar";
import GodocArt from "../assets/GodocArt.png";
import GodocLogo from "../assets/GodocLogo.png";
import { Grid, Typography } from "@material-ui/core";

class Home extends Component {
  render() {
    return (
      <>
        <HomeNavbar />
        <Grid container style={{ padding: "100px 100px" }}>
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
              style={{ marginBottom: "20px", maxWidth: "500px" }}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            style={{
              textAlign: "center",
              margin: "auto",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              style={{ color: "#444444" }}
            >
              Halo, Selamat datang di
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
            <Typography variant="body1">
              Go-Doc adalah aplikasi berbasis web dan mobile untuk menghubungkan
              pasien dan dokter secara online
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
              <Typography variant="h6">Mulai Sekarang</Typography>
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default Home;
