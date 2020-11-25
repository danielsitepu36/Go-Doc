import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { db } from "../../util/config";
import { CardMedia } from "@material-ui/core";

class Dokter extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       open: false,
  //       cek: false,
  //       dokter: {},
  //       dataPenyakit: "",
  //       keterangan: "",
  //     };
  //   }

  //   handleChange = (event) => {
  //     this.setState({
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  //   async componentDidMount() {
  //     await db
  //       .doc(`/pasien/${this.props.periksa.idPasien}`)
  //       .get()
  //       .then((pasienDoc) => {
  //         // console.log(pasienDoc.data().nama);
  //         // periksa.nama = pasienDoc.data().nama;
  //         this.setState({ pasien: pasienDoc.data() });
  //         // console.log(this.state.pasien);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  async terima() {
    await db
      .doc(`/dokter/${this.props.dokter.id}`)
      .update({ isVerified: "true" });
  }
  async tolak() {
    await db
      .doc(`/dokter/${this.props.dokter.id}`)
      .update({ isVerified: "false" });
  }
  async tunggu() {
    await db
      .doc(`/dokter/${this.props.dokter.id}`)
      .update({ isVerified: "menunggu" });
  }

  //   buatRekamMedis = async (event) => {
  //     event.preventDefault();
  //     await db
  //       .doc(`/periksa/${this.props.periksa.id}`)
  //       .update({
  //         diterima: "diperiksa",
  //         rekamMedis: {
  //           dataPenyakit: this.state.dataPenyakit,
  //           keterangan: this.state.keterangan,
  //         },
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   async cekRekamMedis() {
  //     this.handleOpen();
  //   }

  //   handleClose() {
  //     this.setState({
  //       open: false,
  //     });
  //   }
  //   handleOpen() {
  //     this.setState({
  //       open: true,
  //     });
  //   }

  render() {
    const dokter = this.props.dokter;
    return (
      <div style={{ textAlign: "left" }}>
        {/* {console.log(this.props.dokter)} */}
        <Card style={{ margin: "20px", Width: "700px" }}>
          <div style={{ display: "flex" }}>
            <CardMedia
              style={{ width: "200px" }}
              image={dokter.photoURL}
              title="User photo"
            />
            <CardContent>
              <Typography>Nama: {dokter.nama}</Typography>
              <Typography>Tanggal Lahir: {dokter.tanggalLahir}</Typography>
              <Typography>Jenis Kelamin: {dokter.jenisKelamin}</Typography>
              <Typography>Lokasi Praktek: {dokter.tempatPraktek}</Typography>
              <Typography>Nomor STR: {dokter.str}</Typography>
              <Typography>Spesialisasi: {dokter.spesialisasi}</Typography>
            </CardContent>
          </div>
          <CardActions style={{ float: "right" }}>
            <Button
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                marginTop: "10px",
                padding: "8px 15px",
              }}
              size="small"
              onClick={() => this.terima()}
            >
              Terima
            </Button>
            <Button
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                marginTop: "10px",
                padding: "8px 15px",
              }}
              size="small"
              onClick={() => this.tolak()}
            >
              Tolak
            </Button>
            <Button
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                marginTop: "10px",
                padding: "8px 15px",
              }}
              size="small"
              onClick={() => this.tunggu()}
            >
              Tunggu
            </Button>
          </CardActions>
        </Card>
        {/* <Modal
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {this.state.cek === false ? buatBody : cekBody}
        </Modal> */}
      </div>
    );
  }
}
export default Dokter;
