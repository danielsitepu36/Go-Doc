import React, { Component } from "react";
import { Link } from "react-router-dom/";

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
import GroupAdd from "@material-ui/icons/GroupAdd";
import People from "@material-ui/icons/People";
import Folder from "@material-ui/icons/Folder";
import Profile from "@material-ui/icons/AccountBox";

import RekamMedis from "./RekamMedis";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: this.props.dokter,
      uid: this.props.uid,
      filterPeriksa: "menunggu",
      filterJudul: "Daftar Antre Pasien",
      rekamMedis: false,
    };
  }

  async setDashboard(text) {
    await this.setState({ filterJudul: text, rekamMedis: false });
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

  render() {
    return (
      <>
        <AppBar style={{ background: "#e00000" }}>
          <Toolbar>
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
            <List>
              <ListItem
                button
                onClick={() => this.setState({ rekamMedis: true })}
              >
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={"Cari Rekam Medis"} />
              </ListItem>
              {/* <ListItem button>
                <ListItemIcon>
                  <Profile />
                </ListItemIcon>
                <ListItemText primary={"Pengaturan Profil"} />
              </ListItem> */}
            </List>
          </div>
        </Drawer>
        {/* {console.log(this.state.dokter)} */}
        {this.state.rekamMedis === false ? (
          <DaftarPeriksa
            dokter={this.state.dokter}
            uid={this.state.uid}
            filterPeriksa={this.state.filterPeriksa}
            filterJudul={this.state.filterJudul}
            key={this.state.filterPeriksa}
          />
        ) : (
          <RekamMedis />
        )}
      </>
    );
  }
}

export default Dashboard;
