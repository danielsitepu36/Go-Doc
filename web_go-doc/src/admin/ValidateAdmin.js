import React, { Component } from "react";
import { db } from "../util/config";
// import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardAdmin from "./DashboardAdmin";
import NotAdmin from "./NotAdmin";
class ValidateAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
      uid: this.props.user.uid,
    };
  }

  async componentDidMount() {
    // console.log(this.props.user);
    await db
      .doc(`/admin/${this.props.user.uid}`)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          // console.log("exist");
          this.setState({ admin: doc.data() });
          // console.log(this.state.dokter);
        } else {
          this.setState({ admin: { status: false } });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  render() {
    // console.log(this.state.admin);
    if (this.state.admin.status !== false) {
      return <DashboardAdmin admin={this.state.admin} uid={this.state.uid} />;
    } else return <NotAdmin />;
  }
}

export default ValidateAdmin;
