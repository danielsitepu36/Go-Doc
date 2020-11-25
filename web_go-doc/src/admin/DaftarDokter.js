import React, { Component } from "react";

import { db } from "../util/config";
import Dokter from "../components/layout/Dokter";
import { Typography } from "@material-ui/core";

class DaftarPeriksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: [],
    };
  }

  async componentDidMount() {
    // console.log(this.props.filterDokter);
    await db
      .collection("dokter")
      .where("isVerified", "==", `${this.props.filterDokter}`)
      .onSnapshot((data) => {
        // console.log(data);
        let listDokter = [];
        data.forEach(async (doc) => {
          console.log(doc.data());
          listDokter.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ dokter: listDokter });
      });
  }

  render() {
    let dokter = this.state.dokter.map((data) => (
      <Dokter key={data.id} dokter={data} />
    ));
    return (
      <>
        {/* {console.log(this.state.dokter)} */}
        <div style={{ textAlign: "center", marginLeft: "275px" }}>
          <Typography variant="h5" style={{ marginTop: "50px" }}>
            {this.props.filterJudul}
          </Typography>
          {dokter}
        </div>
      </>
    );
  }
}

export default DaftarPeriksa;
