import React, { useEffect } from "react";
import clsx from "clsx";
import firebase from "firebase/app";
import { Link } from "react-router-dom/";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

import GroupAdd from "@material-ui/icons/GroupAdd";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import PersonAddDisabled from "@material-ui/icons/PersonAddDisabled";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import Folder from "@material-ui/icons/Folder";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import GodocLogo from "../assets/GodocLogo.png";
import DaftarPeriksa from "./DaftarPeriksa";
import RekamMedis from "./RekamMedis";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "#e00000",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function DashboardV2(props) {
  const dokter = props.dokter;
  const uid = props.uid;
  const [filterPeriksa, setFilterPeriksa] = React.useState("menunggu");
  const [filterJudul, setFilterJudul] = React.useState("Daftar Antre Pasien");
  const [open, setOpen] = React.useState(true);
  const [rekamMedis, setRekamMedis] = React.useState(false);

  const classes = useStyles();
  const theme = useTheme();

  const handleFilterPeriksa = (filter) => {
    setFilterPeriksa(filter);
  };
  const handleFilterJudul = (filter) => {
    setFilterJudul(filter);
  };

  const handleRekamMedis = (value) => {
    setRekamMedis(value);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#f4f4f4";
  }, []);

  const setDashboard = (text) => {
    handleFilterJudul(text);
    handleRekamMedis(false);
    if (text === "Daftar Antre Pasien") {
      handleFilterPeriksa("menunggu");
    } else if (text === "Pasien Diterima") {
      handleFilterPeriksa("diterima");
    } else if (text === "Pasien Ditolak") {
      handleFilterPeriksa("ditolak");
    } else if (text === "Pasien Telah Diperiksa") {
      handleFilterPeriksa("diperiksa");
    }
  };

  return (
    <div className={classes.root}>
      {/* {console.log(dokter)} */}
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{}} variant="h6">
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
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <img
            alt=""
            src={GodocLogo}
            width="150px"
            style={{ margin: "15px auto" }}
          />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <img
          alt=""
          src={dokter.photoURL}
          width="150px"
          style={{ margin: "15px auto" }}
        />
        <Typography style={{ textAlign: "center" }} variant="h6">
          {dokter.nama}
        </Typography>
        <List>
          {[
            "Daftar Antre Pasien",
            "Pasien Diterima",
            "Pasien Ditolak",
            "Pasien Telah Diperiksa",
          ].map((text, index) => (
            <ListItem button key={text} onClick={() => setDashboard(text)}>
              <ListItemIcon>
                {index === 0 ? <GroupAdd /> : null}
                {index === 1 ? <AssignmentInd /> : null}
                {index === 2 ? <PersonAddDisabled /> : null}
                {index === 3 ? <AssignmentTurnedIn /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => handleRekamMedis(true)}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary={"Cari Rekam Medis"} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {rekamMedis === false ? (
          <DaftarPeriksa
            dokter={dokter}
            uid={uid}
            filterPeriksa={filterPeriksa}
            filterJudul={filterJudul}
            key={filterPeriksa}
          />
        ) : (
          <RekamMedis />
        )}
      </main>
    </div>
  );
}
