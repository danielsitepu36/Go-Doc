import React, { Component } from "react";
import { Link } from "react-router-dom/";

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

import DaftarDokter from "./DaftarDokter";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: this.props.admin,
      filterDokter: "menunggu",
      filterJudul: "Daftar Tunggu Dokter",
    };
  }

  async setDashboard(text) {
    await this.setState({ filterJudul: text });
    if (text === "Daftar Tunggu Dokter") {
      await this.setState({ filterDokter: "menunggu" });
    } else if (text === "Dokter Diterima") {
      await this.setState({ filterDokter: "true" });
    } else if (text === "Dokter Ditolak") {
      await this.setState({ filterDokter: "false" });
    }
    // console.log(this.state.filterDokter);
  }

  render() {
    return (
      <>
        <AppBar style={{ background: "#e00000" }}>
          <Toolbar>
            <Typography style={{ marginLeft: "275px" }} variant="h6">
              Dashboard Admin
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <Button color="inherit" component={Link} to="/admin">
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
          {/* <img
            alt=""
            src={this.state.dokter.photoURL}
            width="100px"
            style={{ margin: "15px auto" }}
          /> */}
          <div style={{ width: "275px" }}>
            <Typography style={{ textAlign: "center" }} variant="h6">
              {this.state.admin.nama}
            </Typography>
            <List>
              {[
                "Daftar Tunggu Dokter",
                "Dokter Diterima",
                "Dokter Ditolak",
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
          </div>
        </Drawer>
        <DaftarDokter
          filterJudul={this.state.filterJudul}
          filterDokter={this.state.filterDokter}
          key={this.state.filterDokter}
        />
        {/* {console.log(this.state.filterDokter)} */}
      </>
    );
  }
}

export default Dashboard;
