import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import AdminNavbar from "../components/layout/AdminNavbar";
import firebase from "firebase/app";

class NotAdmin extends Component {
  async componentDidMount() {
    await firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <AdminNavbar />
        <Typography variant="h1">Anda Bukan Admin</Typography>
      </div>
    );
  }
}

export default NotAdmin;
