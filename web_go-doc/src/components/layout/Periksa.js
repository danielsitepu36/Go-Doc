import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { db } from "../../util/config";
import { CardMedia, Modal } from "@material-ui/core";
import dayjs from "dayjs";
import TextField from "@material-ui/core/TextField";

class Periksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cek: false,
      pasien: {},
      dataPenyakit: "",
      keterangan: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

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

  buatRekamMedis = async (event) => {
    event.preventDefault();
    await db
      .doc(`/periksa/${this.props.periksa.id}`)
      .update({
        diterima: "diperiksa",
        rekamMedis: {
          dataPenyakit: this.state.dataPenyakit,
          keterangan: this.state.keterangan,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Card style={{ margin: "200px auto", width: "500px" }}>
        <CardContent>
          <form
            style={{ textAlign: "center" }}
            noValidate
            onSubmit={this.buatRekamMedis}
          >
            <Typography variant="h5">Buat Rekam Medis</Typography>
            <TextField
              style={{ margin: "20px 0" }}
              id="dataPenyakit"
              multiline
              rows={4}
              name="dataPenyakit"
              type="text"
              label="Data Penyakit"
              fullWidth
              value={this.state.dataPenyakit}
              onChange={this.handleChange}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              id="keterangan"
              multiline
              rows={4}
              name="keterangan"
              type="text"
              label="Keterangan"
              fullWidth
              value={this.state.keterangan}
              onChange={this.handleChange}
            />
            <Typography variant="caption">
              Mohon cek kembali dengan teliti, karena data rekam medis tidak
              dapat diubah
            </Typography>
            <Button
              type="submit"
              style={{
                backgroundColor: "#e00000",
                color: "#fff",
                marginTop: "10px",
                padding: "8px 15px",
              }}
            >
              Buat Rekam Medis
            </Button>
            {/* <TextField
              id="name"
              name="name"
              type="text"
              label="Nama Lengkap"
              fullWidth
            />
            <TextField
              id="str"
              name="str"
              type="text"
              label="Nomor STR"
              fullWidth
            />
            <TextField
              id="lahir"
              name="lahir"
              type="date"
              label="Tanggal Lahir"
              defaultValue="1990-11-10"
              fullWidth
            />
            <TextField
              id="kelamin"
              select
              label="Jenis Kelamin"
              value={kelamin}
              fullWidth
            >
              {kelamin.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="tinggal"
              name="tinggal"
              type="text"
              label="Tempat Tinggal"
              fullWidth
            />
            <TextField
              id="spesialisasi"
              name="spesialisasi"
              type="text"
              label="Spesialisasi"
              fullWidth
            /> */}
          </form>
          <Typography>{periksa.rekamMedis.dataPenyakit}</Typography>
        </CardContent>
      </Card>
    );
    const cekBody = (
      <Card style={{ margin: "200px auto", maxWidth: "600px" }}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h5">Cek Rekam Medis</Typography>
          <TextField
            style={{ margin: "20px 0" }}
            id="cekPenyakit"
            multiline
            rows={4}
            name="cekPenyakit"
            type="text"
            label="Data Penyakit"
            fullWidth
            defaultValue={periksa.rekamMedis.dataPenyakit}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            style={{ margin: "20px 0" }}
            id="cekKeterangan"
            multiline
            rows={4}
            name="cekKeterangan"
            type="text"
            label="Data keterangan"
            fullWidth
            defaultValue={periksa.rekamMedis.keterangan}
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <Typography variant="subtitle1">Data Penyakit:</Typography>
          <Typography variant="body1">
            {periksa.rekamMedis.dataPenyakit}
          </Typography>
          <Typography>Keterangan:</Typography>
          <Typography>{periksa.rekamMedis.keterangan}</Typography> */}
          <Button
            style={{
              backgroundColor: "#e00000",
              color: "#fff",
              marginTop: "10px",
              padding: "8px 15px",
            }}
            onClick={() => this.handleClose()}
          >
            Tutup
          </Button>
        </CardContent>
      </Card>
    );
    return (
      <div style={{ textAlign: "left" }}>
        <Card style={{ margin: "20px", Width: "700px" }}>
          <div style={{ display: "flex" }}>
            <CardMedia
              style={{ width: "120px" }}
              image={pasien.photoURL}
              title="User photo"
            />
            {/* {console.log(
              dayjs(periksa.waktuPeriksa).format("HH:mm, DD MMMM YYYY")
            )} */}
            <CardContent>
              {/* <img
              alt=""
              src={pasien.photoURL}
              width="50px"
              style={{ float: "left", marginRight: "10px" }}
            /> */}
              <Typography>{pasien.nama}</Typography>
              <Typography>Keluhan: {periksa.keluhan}</Typography>
              <Typography>Jadwal Periksa: {time}</Typography>
              {/* <Typography>Waktu Periksa: {periksa.waktuPeriksa}</Typography> */}
            </CardContent>
          </div>

          <CardActions style={{ float: "right" }}>
            {periksa.diterima === "menunggu" ? (
              <>
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
              </>
            ) : null}
            {periksa.diterima === "diterima" &&
            periksa.rekamMedis.dataPenyakit == null ? (
              <Button
                style={{
                  backgroundColor: "#e00000",
                  color: "#fff",
                  marginTop: "10px",
                  padding: "8px 15px",
                }}
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
                style={{
                  backgroundColor: "#e00000",
                  color: "#fff",
                  marginTop: "10px",
                  padding: "8px 15px",
                }}
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
