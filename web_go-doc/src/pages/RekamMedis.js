import React, { Component } from "react";

import { db } from "../util/config";
import Periksa from "../components/layout/Periksa";
import { Button, TextField, Typography } from "@material-ui/core";

class RekamMedis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search: false,
      pasien: {},
      error: "",
      periksa: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cariPasien = async (event) => {
    event.preventDefault();
    this.setState({
      search: false,
      pasien: {},
      error: "",
      periksa: [],
    });

    await db
      .collection("pasien")
      .where("gmail", "==", this.state.query)
      .limit(1)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          //   console.log(doc.id);
          this.setState({
            pasien: { ...doc.data(), id: doc.id },
            search: true,
          });
        });
      })
      .catch((err) => {
        // console.log(err);
      });
    // console.log(this.state.pasien);

    if (this.state.pasien.id !== undefined) {
      // console.log(this.state.pasien.id);
      await db
        .collection("periksa")
        .where("idPasien", "==", this.state.pasien.id)
        .where("diterima", "==", "diperiksa")
        .get()
        .then((data) => {
          let listPeriksa = [];
          data.forEach(async (doc) => {
            // console.log(doc.data());
            listPeriksa.push({ ...doc.data(), id: doc.id });
          });
          this.setState({ periksa: listPeriksa, error: "" });
        })
        .catch((err) => {
          //   console.log(err);
        });
    } else {
      this.setState({
        error: "Pasien tidak ditemukan",
      });
    }
  };

  render() {
    let periksa = this.state.periksa.map((data) => (
      <Periksa key={data.id} periksa={data} />
    ));
    return (
      <div style={{ textAlign: "center", marginLeft: "275px" }}>
        <Typography variant="h4">Cari Rekam Medis</Typography>
        <div style={{ margin: "20px auto", maxWidth: "500px" }}>
          <form onSubmit={this.cariPasien}>
            <TextField
              style={{
                width: "300px",
                maxWidth: "400px",
                marginBottom: "10px",
              }}
              id="query"
              variant="outlined"
              required
              name="query"
              type="text"
              label="Email Pasien"
              value={this.state.query}
              onChange={this.handleChange}
              error={this.state.error}
            />
            <Button
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                padding: "8px 15px",
                marginLeft: "20px",
                height: "55px",
              }}
              type="submit"
            >
              Cari
            </Button>
          </form>
        </div>
        {this.state.search &&
          (periksa.length > 0 ? (
            periksa
          ) : (
            <Typography>Pasien belum pernah periksa</Typography>
          ))}
        {this.state.error !== "" && (
          <Typography>Pasien tidak ditemukan</Typography>
        )}
      </div>
      //   <>
      //     <div style={{ textAlign: "center", marginLeft: "275px" }}>
      //       {/* {console.log(this.props.dokter)} */}
      //       <Typography variant="h5" style={{ marginTop: "50px" }}>
      //         {this.props.filterJudul}
      //       </Typography>
      //       {periksa}
      //     </div>
      //   </>
    );
  }
}

export default RekamMedis;
