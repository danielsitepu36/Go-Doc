import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import HomeNavbar from "../../components/layout/HomeNavbar";

import GodocArt from "../../assets/GodocArt2.png";

class WaitVerified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: this.props.dokter,
    };
  }
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
              Terima kasih sudah mendaftar
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#444444" }}
            >
              Silakan menunggu admin untuk memverifikasi
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#444444" }}
            >
              atau hubungi kami di: +6212345678
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default WaitVerified;
