import React, { useEffect } from "react";
import clsx from "clsx";
import firebase from "firebase/app";
import { Link } from "react-router-dom/";

import { makeStyles } from "@material-ui/core/styles";
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
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function DashboardV3(props) {
  const dokter = props.dokter;
  const uid = props.uid;
  const [filterPeriksa, setFilterPeriksa] = React.useState("menunggu");
  const [filterJudul, setFilterJudul] = React.useState("Daftar Antre Pasien");
  const [open, setOpen] = React.useState(true);
  const [rekamMedis, setRekamMedis] = React.useState(false);

  const classes = useStyles();

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
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
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
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img
            alt=""
            src={GodocLogo}
            width="150px"
            style={{ margin: "auto" }}
          />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {open === true ? (
          <>
            <img
              alt=""
              src={dokter.photoURL}
              width="150px"
              style={{ margin: "15px auto" }}
            />
            <Typography style={{ textAlign: "center" }} variant="h6">
              {dokter.nama}
            </Typography>
          </>
        ) : null}
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
      <main className={classes.content}>
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
