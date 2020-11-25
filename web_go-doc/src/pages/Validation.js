import React, { Component } from "react";
import { db } from "../util/config";
import Dashboard from "./Dashboard";
import DataDokter from "./DataDokter";
import HomeNavbar from "../components/layout/HomeNavbar";
import Rejected from "./verify/Rejected";
import WaitVerified from "./verify/WaitVerified";

class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: {},
      uid: this.props.user.uid,
    };
  }

  async componentDidMount() {
    console.log(this.props.user);
    await db
      .doc(`/dokter/${this.props.user.uid}`)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          console.log("exist");
          this.setState({ dokter: doc.data() });
          // console.log(this.state.dokter);
        } else {
          const newDokter = {
            nama: this.props.user.displayName,
            email: this.props.user.email,
            photoURL: this.props.user.photoURL,
            isVerified: "menunggu",
          };
          await db.doc(`/dokter/${this.props.user.uid}`).set(newDokter);
          await this.setState({ dokter: newDokter });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // return <div>a</div>;
    if (this.state.dokter.isVerified === "true") {
      return <Dashboard dokter={this.state.dokter} uid={this.state.uid} />;
    } else if (this.state.dokter.isVerified === "menunggu") {
      if (this.state.dokter.str === undefined) {
        return <DataDokter dokter={this.state.dokter} uid={this.state.uid} />;
      } else {
        return <WaitVerified dokter={this.state.dokter} uid={this.state.uid} />;
      }
    } else if (this.state.dokter.isVerified === "false") {
      return <Rejected dokter={this.state.dokter} uid={this.state.uid} />;
    } else {
      return <HomeNavbar />;
    }

    // if (this.state.dokter.isVerified === false) {
    //   if (this.state.dokter.str === undefined) {
    //     return <DataDokter dokter={this.state.dokter} uid={this.state.uid} />;
    //   } else {
    //     return <Redirect to="/notverified" />;
    //   }
    // } else {
    //   // return <Dashboard dokter={this.state.dokter} uid={this.state.uid} />;
    // }
  }
}

export default Validation;
