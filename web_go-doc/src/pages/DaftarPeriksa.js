import React, { Component } from "react";

import { db } from "../util/config";
import Periksa from "../components/periksa/Periksa";
import { Typography } from "@material-ui/core";

class DaftarPeriksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periksa: [],
    };
  }

  async componentDidMount() {
    await db
      .collection("periksa")
      .where("idDokter", "==", `${this.props.uid}`)
      .where("diterima", "==", `${this.props.filterPeriksa}`)
      .onSnapshot((data) => {
        // console.log(data);
        let listPeriksa = [];
        data.forEach(async (doc) => {
          console.log(this.props.filterPeriksa);
          // let periksa = {
          //   id: doc.id,
          //   idDokter: doc.data().idDokter,
          //   idPasien: doc.data().idPasien,
          //   keluhan: doc.data().keluhan,
          //   diterima: doc.data().diterima,
          //   rekamMedis: doc.data().rekamMedis,
          //   nama: "",
          // };
          // db.doc(`/pasien/${doc.data().idPasien}`)
          //   .get()
          //   .then((pasienDoc) => {
          //     // console.log(pasienDoc.data().nama);
          //     periksa.nama = pasienDoc.data().nama;
          //     // listPeriksa.push({ ...periksa, id: doc.id });
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          // console.log(periksa);
          listPeriksa.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ periksa: listPeriksa });
        // console.log(this.state.periksa[0].diterima);
      });
  }

  render() {
    const user = this.props.user;
    let periksa = this.state.periksa.map((data) => (
      <Periksa key={data.id} periksa={data} />
    ));
    // let periksaDiterima = this.state.periksa.map((data) =>
    //   data.diterima === "diterima" && data.rekamMedis.dataPenyakit == null ? (
    //     <Periksa key={data.id} periksa={data} />
    //   ) : null
    // );
    // let periksaDitolak = this.state.periksa.map((data) =>
    //   data.diterima === "ditolak" ? (
    //     <Periksa key={data.id} periksa={data} />
    //   ) : null
    // );
    // let periksaDiperiksa = this.state.periksa.map((data) =>
    //   data.diterima === "diterima" && data.rekamMedis.dataPenyakit != null ? (
    //     <Periksa key={data.id} periksa={data} />
    //   ) : null
    // );
    return (
      <>
        {/* <DashboardNavbar /> */}
        <div style={{ textAlign: "center", marginLeft: "275px" }}>
          {/* {console.log(this.state.periksa)} */}
          <Typography variant="h5" style={{ marginTop: "50px" }}>
            {this.props.filterJudul}
          </Typography>
          {periksa}
          {/* <Typography variant="h5" style={{ marginTop: "50px" }}>
            Daftar Pasien Diterima
          </Typography>
          {periksaDiterima}
          <Typography variant="h5" style={{ marginTop: "50px" }}>
            Daftar Pasien Ditolak
          </Typography>
          {periksaDitolak}
          <Typography
            variant="h5"
            style={{ marginTop: "50px", textAlign: "left" }}
          >
            Daftar Pasien Sudah Diperiksa
          </Typography>
          {periksaDiperiksa} */}
          {/* {console.log(this.props.user.photoURL)} */}
          {/* <div>{this.state.uid}</div> */}
        </div>
      </>
    );
  }
}

export default DaftarPeriksa;
