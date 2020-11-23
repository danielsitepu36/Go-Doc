import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";

import { db } from "../util/config";
import DaftarPeriksa from "./DaftarPeriksa";

import firebase from "firebase/app";
import "firebase/auth";
// // MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// // Icons
import GodocLogo from "../assets/GodocLogo.png";

// Drawer

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderShared from "@material-ui/icons/FolderShared";
import GroupAdd from "@material-ui/icons/GroupAdd";
import People from "@material-ui/icons/People";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: {},
      isVerified: false,
      uid: "",
      periksa: [],
      filterJudul: "Daftar Antre Pasien",
      filterPeriksa: "diterima",
    };
  }

  async setDashboard(text) {
    await this.setState({ filterJudul: text });
    if (text === "Daftar Antre Pasien") {
      await this.setState({ filterPeriksa: "menunggu" });
    } else if (text === "Pasien Diterima") {
      await this.setState({ filterPeriksa: "diterima" });
    } else if (text === "Pasien Ditolak") {
      await this.setState({ filterPeriksa: "ditolak" });
    } else if (text === "Pasien Telah Diperiksa") {
      await this.setState({ filterPeriksa: "diperiksa" });
    }
    // console.log(this.state.filterPeriksa);
  }

  async componentDidMount() {
    await db
      .doc(`/dokter/${this.props.user.uid}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ dokter: doc.data() });
        } else {
          const newDokter = {
            nama: this.props.user.displayName,
            email: this.props.user.email,
            photoURL: this.props.user.photoURL,
            isVerified: false,
          };
          db.doc(`/dokter/${this.props.user.uid}`).set(newDokter);
          this.setState({ dokter: newDokter });
        }
        this.setState({ uid: this.props.user.uid });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <AppBar style={{ background: "#e00000" }}>
          <Toolbar>
            {/* <Link to="/" style={{ marginLeft: "275px" }}>
              <img alt="" src={GodocLogo} width="150px" />
            </Link> */}
            <Typography style={{ marginLeft: "275px" }} variant="h6">
              Dashboard Dokter
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        {/* {console.log(this.props.user)} */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={true}
          style={{ width: "275px" }}
        >
          <img
            alt=""
            src={GodocLogo}
            width="150px"
            style={{ margin: "15px auto" }}
          />
          <img
            alt=""
            src={this.state.dokter.photoURL}
            width="100px"
            style={{ margin: "15px auto" }}
          />
          <div style={{ width: "275px" }}>
            <Typography style={{ textAlign: "center" }} variant="h6">
              {this.state.dokter.nama}
            </Typography>
            <List>
              {[
                "Daftar Antre Pasien",
                "Pasien Diterima",
                "Pasien Ditolak",
                "Pasien Telah Diperiksa",
              ].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => this.setDashboard(text)}
                >
                  <ListItemIcon>
                    {index === 0 ? <GroupAdd /> : <People />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            {/* <List>
              {["Rekam Medis"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <FolderShared />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
          </div>
        </Drawer>
        <DaftarPeriksa
          user={this.state.dokter}
          uid={this.state.uid}
          filterPeriksa={this.state.filterPeriksa}
          filterJudul={this.state.filterJudul}
          key={this.state.filterPeriksa}
        />
        {/* {console.log(this.state.filterPeriksa)} */}
      </>
    );
  }
}

export default Dashboard;
