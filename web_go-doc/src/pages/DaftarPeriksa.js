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
    // let orderBased = "jadwalPeriksa";
    // let order = "asc";
    // if (this.props.filterPeriksa === "diperiksa") {
    //   orderBased = "waktuPeriksa";
    //   order = "desc";
    // }
    await db
      .collection("periksa")
      .where("idDokter", "==", `${this.props.uid}`)
      .where("diterima", "==", `${this.props.filterPeriksa}`)
      // .orderBy(orderBased, order)
      .onSnapshot((data) => {
        // console.log(data);
        let listPeriksa = [];
        data.forEach(async (doc) => {
          // console.log(this.props.filterPeriksa);
          listPeriksa.push({ ...doc.data(), id: doc.id });
        });
        if (this.props.filterPeriksa === "diperiksa") {
          listPeriksa.sort(function (a, b) {
            return new Date(b.waktuPeriksa) - new Date(a.waktuPeriksa);
          });
        } else {
          listPeriksa.sort(function (a, b) {
            return new Date(a.jadwalPeriksa) - new Date(b.jadwalPeriksa);
          });
        }
        this.setState({ periksa: listPeriksa });
      });
  }

  render() {
    let periksa = this.state.periksa.map((data) => (
      <Periksa key={data.id} periksa={data} />
    ));
    return (
      <>
        <div
          style={{
            textAlign: "center",
            //  marginLeft: "275px"
          }}
        >
          {/* {console.log(this.props.dokter)} */}
          <Typography
            variant="h4"
            // style={{ marginTop: "50px" }}
          >
            {this.props.filterJudul}
          </Typography>
          <div>
            {periksa.length > 0 ? (
              periksa
            ) : (
              <Typography style={{ marginTop: "30px" }}>
                Tidak ada data pasien
              </Typography>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default DaftarPeriksa;
