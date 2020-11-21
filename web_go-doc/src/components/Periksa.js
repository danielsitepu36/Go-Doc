import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { db } from "../util/config";
import { Modal } from "@material-ui/core";
import dayjs from "dayjs";
class Periksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cek: false,
      pasien: {},
      rekamMedis: {
        dataPenyakit: "sehat",
        keterangan: "harusnya",
      },
    };
  }

  async componentDidMount() {
    await db
      .doc(`/pasien/${this.props.periksa.idPasien}`)
      .get()
      .then((pasienDoc) => {
        // console.log(pasienDoc.data().nama);
        // periksa.nama = pasienDoc.data().nama;
        this.setState({ pasien: pasienDoc.data() });
        // console.log(this.state.pasien);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async terima() {
    await db
      .doc(`/periksa/${this.props.periksa.id}`)
      .update({ diterima: "diterima" });
  }
  async tolak() {
    await db
      .doc(`/periksa/${this.props.periksa.id}`)
      .update({ diterima: "ditolak" });
  }

  async buatRekamMedis() {
    // await db
    //   .doc(`/periksa/${this.props.periksa.id}`)
    //   .update({ rekamMedis: this.state.rekamMedis });
  }

  async cekRekamMedis() {
    this.handleOpen();
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }
  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    const periksa = this.props.periksa;
    const pasien = this.state.pasien;
    const time = dayjs(periksa.waktuPeriksa).format("HH:mm, DD MMMM YYYY");
    // var date = new Date(periksa.waktuPeriksa * 1000);
    // var time =
    //   date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
    // var time = date.toLocaleDateString("en-US");
    const buatBody = (
      <Card style={{ margin: "200px auto", height: "200px", width: "500px" }}>
        <CardContent>
          <h2 id="simple-modal-title">Buat Rekam Medis</h2>
          <Typography>{periksa.rekamMedis.dataPenyakit}</Typography>
        </CardContent>
      </Card>
    );
    const cekBody = (
      <Card style={{ margin: "200px auto", height: "200px", width: "500px" }}>
        <CardContent>
          <h2 id="simple-modal-title">Cek Rekam Medis</h2>
          <Typography>{periksa.rekamMedis.dataPenyakit}</Typography>
        </CardContent>
      </Card>
    );
    return (
      <div style={{ textAlign: "left" }}>
        <Card style={{ marginBottom: "30px", maxWidth: "600px" }}>
          <CardContent>
            {console.log(
              dayjs(periksa.waktuPeriksa).format("HH:mm, DD MMMM YYYY")
            )}
            <img
              alt=""
              src={pasien.photoURL}
              width="50px"
              style={{ float: "left", marginRight: "10px" }}
            />
            <Typography>{pasien.nama}</Typography>
            <Typography>Keluhan: {periksa.keluhan}</Typography>
            <Typography>Jadwal Periksa: {time}</Typography>
            {/* <Typography>Waktu Periksa: {periksa.waktuPeriksa}</Typography> */}
          </CardContent>

          {/* {periksa.diterima == "menunggu" ? ( */}
          <CardActions>
            {/* {periksa.diterima == "menunggu" ? ( */}
            <Button size="small" onClick={() => this.terima()}>
              Terima
            </Button>
            {/* ) : null} */}
            {/* {periksa.rekamMedis.dataPenyakit == null ? ( */}
            <Button size="small" onClick={() => this.tolak()}>
              Tolak
            </Button>
            {/* ) : null} */}
            {periksa.diterima === "diterima" &&
            periksa.rekamMedis.dataPenyakit == null ? (
              <Button
                size="small"
                onClick={() => {
                  this.setState({ cek: false });
                  this.handleOpen();
                }}
              >
                Buat Rekam Medis
              </Button>
            ) : null}
            {periksa.rekamMedis.dataPenyakit != null ? (
              <Button
                size="small"
                onClick={() => {
                  this.setState({ cek: true });
                  this.handleOpen();
                }}
              >
                Cek Rekam Medis
              </Button>
            ) : null}
          </CardActions>
          {/* ) : null} */}
        </Card>
        <Modal
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {this.state.cek === false ? buatBody : cekBody}
        </Modal>
      </div>
    );
  }
}
export default Periksa;
