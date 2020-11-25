import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import HomeNavbar from "../../components/layout/HomeNavbar";

import { Redirect } from "react-router-dom";
import { db } from "../../util/config";
import GodocArt from "../../assets/GodocArt2.png";

class Rejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: this.props.dokter,
      wait: false,
    };
  }

  perbaiki = async () => {
    const newDokter = {
      nama: this.props.dokter.nama,
      email: this.props.dokter.email,
      photoURL: this.props.dokter.photoURL,
      isVerified: "menunggu",
    };
    await db.doc(`/dokter/${this.props.uid}`).set(newDokter);
    this.setState({ wait: true });
  };

  render() {
    return (
      <div>
        {this.state.wait === true ? <Redirect to="/" /> : null}
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
              Maaf, status anda ditolak
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#444444" }}
            >
              Silakan masukkan ulang data diri anda
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#444444" }}
            >
              atau hubungi kami di: +6212345678
            </Typography>
            <Button
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                marginTop: "10px",
                padding: "8px 15px",
                borderRadius: "15px",
              }}
              onClick={this.perbaiki}
            >
              <Typography variant="h6">Reset Data</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Rejected;
