import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";
import MyButton from "../../util/MyButton";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import GodocWhiteLogo from "../../assets/GodocWhiteLogo.png";
import Heart from "../../assets/Heart.png";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@material-ui/core";

class Navbar extends Component {
  render() {
    return (
      <>
        <AppBar style={{ background: "#e00000" }}>
          <Toolbar>
            <Link to="/">
              <img src={GodocWhiteLogo} width="150px" />
            </Link>
            <div style={{ marginLeft: "auto" }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <div
          style={{
            backgroundColor: "#e00000",
            overflow: "hidden",
            position: "fixed",
            bottom: "0",
            width: "101%",
            marginLeft: "-1%",
            height: "40px",
            paddingRight: "1%",
            paddingTop: "15px",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" style={{ color: "white" }}>
            Made with
            <img src={Heart} width="20px" style={{ margin: "2px 8px" }} />
            by Tepu, Rian, Adhit
          </Typography>
        </div>
      </>
    );
  }
}

export default Navbar;
