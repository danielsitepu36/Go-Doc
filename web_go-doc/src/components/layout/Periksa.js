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
      buat: false,
      data: false,
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
        // console.log(err);
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
        // console.log(err);
      });
  };

  handleClose() {
    this.setState({
      open: false,
      cek: false,
      buat: false,
      data: false,
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
      <Card style={{ margin: "100px auto", width: "500px" }}>
        <CardContent>
          <form style={{ textAlign: "center" }} onSubmit={this.buatRekamMedis}>
            <Typography variant="h5">Buat Rekam Medis</Typography>
            <TextField
              style={{ margin: "20px auto" }}
              id="dataPenyakit"
              multiline
              required
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
              required
              multiline
              rows={4}
              name="keterangan"
              type="text"
              label="Keterangan"
              fullWidth
              value={this.state.keterangan}
              onChange={this.handleChange}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              id="obat"
              required
              multiline
              rows={2}
              name="obat"
              type="text"
              label="Obat"
              fullWidth
              // value={this.state.keterangan}
              // onChange={this.handleChange}
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
                marginTop: "20px",
                padding: "8px 15px",
              }}
            >
              Buat Rekam Medis
            </Button>
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
            variant="outlined"
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
            variant="outlined"
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

    const dataBody = (
      <Card style={{ margin: "100px auto", maxWidth: "600px" }}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h5">Data Diri Pasien</Typography>
          <TextField
            style={{ margin: "20px 0" }}
            id="nama"
            variant="outlined"
            name="nama"
            type="text"
            label="Nama Pasien"
            fullWidth
            defaultValue={pasien.nama}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            style={{ margin: "20px 0" }}
            variant="outlined"
            id="tanggalLahir"
            name="tanggalLahir"
            type="text"
            label="Tanggal Lahir"
            fullWidth
            defaultValue={dayjs(pasien.tanggalLahir).format("DD MMMM YYYY")}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            style={{ margin: "20px 0" }}
            variant="outlined"
            id="noTelp"
            name="noTelp"
            type="text"
            label="Nomor Telepon"
            fullWidth
            defaultValue={pasien.noTelp}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            style={{ margin: "20px 0" }}
            variant="outlined"
            id="alamat"
            name="alamat"
            type="text"
            label="Alamat"
            fullWidth
            defaultValue={pasien.alamat}
            InputProps={{
              readOnly: true,
            }}
          />
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
            {periksa.diterima !== "ditolak" ? (
              <Button
                style={{
                  backgroundColor: "#e00000",
                  color: "#fff",
                  marginTop: "10px",
                  padding: "8px 15px",
                }}
                size="small"
                onClick={() => {
                  this.setState({ data: true });
                  this.handleOpen();
                }}
              >
                Cek Data Pasien
              </Button>
            ) : null}
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
                  this.setState({ buat: true });
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
          {this.state.cek === true
            ? cekBody
            : this.state.buat === true
            ? buatBody
            : this.state.data === true
            ? dataBody
            : null}
        </Modal>
      </div>
    );
  }
}
export default Periksa;
