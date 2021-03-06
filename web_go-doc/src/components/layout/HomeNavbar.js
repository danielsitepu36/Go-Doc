import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import GodocWhiteLogo from "../../assets/GodocWhiteLogo.png";
import Heart from "../../assets/Heart.png";
import { Typography } from "@material-ui/core";

class Navbar extends Component {
  render() {
    return (
      <>
        <AppBar style={{ background: "#e00000" }}>
          <Toolbar>
            <Link to="/">
              <img alt="" src={GodocWhiteLogo} width="150px" />
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
            zIndex: 1,
            backgroundColor: "#e00000",
            position: "fixed",
            left: "0",
            bottom: "0",
            width: "100%",
            height: "40px",
            paddingTop: "15px",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" style={{ color: "white" }}>
            Made with
            <img
              alt=""
              src={Heart}
              width="20px"
              style={{ margin: "2px 8px", verticalAlign: "middle" }}
            />
            by Tepu, Rian, Adhit
          </Typography>
        </div>
      </>
    );
  }
}

export default Navbar;
