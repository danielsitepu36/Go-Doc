import React, { Component } from "react";

// MUI stuff
import HomeNavbar from "../components/layout/HomeNavbar";
import NotFoundImage from "../assets/NotFound.png";
import { Grid, Typography } from "@material-ui/core";

class NotFound extends Component {
  render() {
    return (
      <>
        <HomeNavbar />
        <Grid container style={{ paddingTop: "100px" }}>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            style={{ textAlign: "center", margin: "auto" }}
          >
            <img
              alt=""
              src={NotFoundImage}
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
              Maaf, halaman yang anda cari tidak ditemukan
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default NotFound;
