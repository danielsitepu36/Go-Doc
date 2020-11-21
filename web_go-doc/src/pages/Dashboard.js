import React, { Component } from "react";

import { firebaseConfig, db } from "../util/config";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Periksa from "../components/Periksa";
import { Typography } from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: {},
      isVerified: false,
      uid: "",
      periksa: [],
    };
  }

  async componentDidMount() {
    await db
      .doc(`/dokter/${this.props.user.uid}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ dokter: doc.data() });
        } else {
          const newDokter = {
            nama: this.props.user.displayName,
            email: this.props.user.email,
            photoURL: this.props.user.photoURL,
            isVerified: false,
          };
          db.doc(`/dokter/${this.props.user.uid}`).set(newDokter);
          this.setState({ dokter: doc.data() });
        }
        this.setState({ uid: this.props.user.uid });
      })
      .catch((err) => {
        console.log(err);
      });
    await db.collection("periksa").onSnapshot((data) => {
      // console.log(data);
      let listPeriksa = [];
      data.forEach(async (doc) => {
        // console.log(doc.data());
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
    let periksa = this.state.periksa.map((data) =>
      data.diterima === "menunggu" ? (
        <Periksa key={data.id} periksa={data} />
      ) : null
    );
    let periksaDiterima = this.state.periksa.map((data) =>
      data.diterima === "diterima" && data.rekamMedis.dataPenyakit == null ? (
        <Periksa key={data.id} periksa={data} />
      ) : null
    );
    let periksaDitolak = this.state.periksa.map((data) =>
      data.diterima === "ditolak" ? (
        <Periksa key={data.id} periksa={data} />
      ) : null
    );
    let periksaDiperiksa = this.state.periksa.map((data) =>
      data.diterima === "diterima" && data.rekamMedis.dataPenyakit != null ? (
        <Periksa key={data.id} periksa={data} />
      ) : null
    );
    return (
      <>
        {/* <DashboardNavbar /> */}
        <div>
          {/* {console.log(this.state.periksa)} */}
          <Typography variant="h5" style={{ marginTop: "50px" }}>
            Daftar Antre Pasien
          </Typography>
          {periksa}
          <Typography variant="h5" style={{ marginTop: "50px" }}>
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
          {periksaDiperiksa}
          {/* {console.log(this.props.user.photoURL)} */}
          {/* <div>{this.state.uid}</div> */}
        </div>
      </>
    );
  }
}

export default Dashboard;
