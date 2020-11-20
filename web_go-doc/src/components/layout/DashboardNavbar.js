import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";
import MyButton from "../../util/MyButton";

import firebase from "firebase/app";
import "firebase/auth";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import GodocLogo from "../../assets/GodocLogo.png";

class Navbar extends Component {
  render() {
    return (
      <AppBar style={{ background: "#e00000" }}>
        <Toolbar>
          <Link to="/">
            <img src={GodocLogo} width="150px" />
          </Link>
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
    );
  }
}

export default Navbar;