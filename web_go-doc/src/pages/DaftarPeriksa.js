import React, { Component } from "react";

import { db } from "../util/config";
import Periksa from "../components/layout/Periksa";
import { Typography } from "@material-ui/core";

class DaftarPeriksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periksa: [],
    };
  }

  async componentDidMount() {
    // console.log(this.props.dokter);
    await db
      .collection("periksa")
      .where("idDokter", "==", `${this.props.uid}`)
      .where("diterima", "==", `${this.props.filterPeriksa}`)
      .onSnapshot((data) => {
        // console.log(data);
        let listPeriksa = [];
        data.forEach(async (doc) => {
          // console.log(this.props.filterPeriksa);
          listPeriksa.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ periksa: listPeriksa });
      });
  }

  render() {
    let periksa = this.state.periksa.map((data) => (
      <Periksa key={data.id} periksa={data} />
    ));
    return (
      <>
        <div style={{ textAlign: "center", marginLeft: "275px" }}>
          {/* {console.log(this.props.dokter)} */}
          <Typography variant="h5" style={{ marginTop: "50px" }}>
            {this.props.filterJudul}
          </Typography>
          {periksa.length > 0 ? (
            periksa
          ) : (
            <Typography style={{ marginTop: "30px" }}>
              Tidak ada data pasien
            </Typography>
          )}
        </div>
      </>
    );
  }
}

export default DaftarPeriksa;
