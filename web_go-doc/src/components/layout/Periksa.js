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
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

var batch = db.batch();

class Periksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daftarObat: [
        {
          idPeriksa: this.props.periksa.id,
          idPasien: this.props.periksa.idPasien,
          namaObat: "",
          jadwal: "",
        },
      ],
      open: false,
      cek: false,
      buat: false,
      data: false,
      pasien: {},
      obat: [],
      dataPenyakit: "",
      keterangan: "",
      waktuPeriksa: null,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeObat = (event) => {
    // console.log(event.target.id);
    let daftarObat = [...this.state.daftarObat];
    daftarObat[event.target.id][event.target.name] = event.target.value;
    this.setState({ daftarObat });
  };

  addObat = (event) => {
    this.setState((prevState) => ({
      daftarObat: [
        ...prevState.daftarObat,
        {
          idPeriksa: this.props.periksa.id,
          idPasien: this.props.periksa.idPasien,
          namaObat: "",
          jadwal: "",
        },
      ],
    }));
    // console.log(this.state.daftarObat);
  };
  removeObat = (event) => {
    this.setState((prevState) => ({
      daftarObat: [...prevState.daftarObat.slice(0, -1)],
    }));
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

    // await db
    //   .doc(`/periksa/${this.props.periksa.id}`)
    //   .collection("reminderObat")
    //   .get()
    //   .then((data) => {
    //     let obat = [];
    //     data.forEach((doc) => {
    //       obat.push({ ...doc.data() });
    //     });
    //     this.setState({ obat: obat });
    //   })
    //   .catch((err) => {
    //     // console.log(err)
    //   });
    await db
      .collection("reminderObat")
      .where("idPeriksa", "==", this.props.periksa.id)
      .get()
      .then((data) => {
        let obat = [];
        data.forEach((doc) => {
          obat.push({ ...doc.data() });
        });
        this.setState({ obat: obat });
      })
      .catch((err) => {
        // console.log(err)
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
        waktuPeriksa: this.state.waktuPeriksa.toISOString(),
        rekamMedis: {
          dataPenyakit: this.state.dataPenyakit,
          keterangan: this.state.keterangan,
        },
      })
      .catch((err) => {
        // console.log(err);
      });
    // console.log(this.state.daftarObat);
    this.state.daftarObat.forEach(async (data) => {
      // console.log(data);
      // var docRef = db.collection("reminderObat").doc();
      // await batch.set(docRef, data);
      await db
        .collection("reminderObat")
        .add({ ...data })
        .catch((err) => {
          // console.log(err);
        });
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
      waktuPeriksa: new Date(),
    });
  }

  render() {
    const periksa = this.props.periksa;
    const pasien = this.state.pasien;
    const time = dayjs(periksa.jadwalPeriksa).format("HH:mm, DD MMMM YYYY");
    const periksaTime = dayjs(periksa.waktuPeriksa).format(
      "HH:mm, DD MMMM YYYY"
    );
    // var date = new Date(periksa.waktuPeriksa * 1000);
    // var time =
    //   date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
    // var time = date.toLocaleDateString("en-US");
    const buatBody = (
      <Card
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          margin: "30px auto",
          width: "600px",
        }}
      >
        <CardContent>
          <form style={{ textAlign: "center" }} onSubmit={this.buatRekamMedis}>
            <Typography variant="h5">Buat Rekam Medis</Typography>

            <TextField
              style={{ margin: "20px auto" }}
              InputLabelProps={{ shrink: true }}
              id="waktuPeriksa"
              variant="outlined"
              required
              name="waktuPeriksa"
              type="text"
              label="Waktu Pembuatan Rekam Medis"
              fullWidth
              value={this.state.waktuPeriksa}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              id="dataPenyakit"
              variant="outlined"
              multiline
              required
              rows={2}
              name="dataPenyakit"
              type="text"
              label="Nama Penyakit (Bisa dilihat pasien)"
              fullWidth
              value={this.state.dataPenyakit}
              onChange={this.handleChange}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              id="keterangan"
              variant="outlined"
              required
              multiline
              rows={4}
              name="keterangan"
              type="text"
              label="Rekam Medis / Keterangan (Hanya bisa dilihat dokter)"
              fullWidth
              value={this.state.keterangan}
              onChange={this.handleChange}
            />
            <div>
              <div style={{ textAlign: "center", marginBottom: "5px" }}>
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    margin: "5px",
                  }}
                >
                  Jumlah Obat: {this.state.daftarObat.length}
                </Typography>

                <IconButton
                  size="small"
                  style={{
                    backgroundColor: "#e00000",
                    color: "#fff",
                  }}
                  onClick={this.removeObat}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  size="small"
                  style={{
                    backgroundColor: "#e00000",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  onClick={this.addObat}
                >
                  <AddIcon />
                </IconButton>
              </div>
              {this.state.daftarObat.map((val, idx) => {
                let obatID = `${idx}`;
                return (
                  <div key={idx}>
                    <TextField
                      style={{ marginTop: "20px", width: "260px" }}
                      id={obatID}
                      variant="outlined"
                      required
                      multiline
                      name="namaObat"
                      type="text"
                      label={`Nama Obat-${idx + 1}`}
                      value={val.nama}
                      onChange={this.handleChangeObat}
                    />
                    <TextField
                      style={{
                        marginTop: "20px",
                        marginLeft: "20px",
                        width: "260px",
                      }}
                      id={obatID}
                      variant="outlined"
                      required
                      multiline
                      name="jadwal"
                      type="text"
                      label={`Jadwal Minum Obat-${idx + 1}`}
                      value={val.jadwal}
                      onChange={this.handleChangeObat}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "20px" }}>
              <Typography variant="caption">
                Mohon cek kembali dengan teliti, karena data rekam medis tidak
                dapat diubah
              </Typography>
            </div>
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
      <Card
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          margin: "70px auto",
          width: "600px",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h5">Cek Rekam Medis</Typography>
          <TextField
            style={{ margin: "20px auto" }}
            InputLabelProps={{ shrink: true }}
            id="waktuPeriksa"
            variant="outlined"
            required
            name="waktuPeriksa"
            type="text"
            label="Waktu Pembuatan Rekam Medis"
            fullWidth
            value={periksaTime}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            style={{ margin: "20px 0" }}
            id="cekPenyakit"
            multiline
            variant="outlined"
            rows={2}
            name="cekPenyakit"
            type="text"
            label="Nama Penyakit (Bisa dilihat pasien)"
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
            label="Rekam Medis / Keterangan (Hanya bisa dilihat dokter)"
            fullWidth
            defaultValue={periksa.rekamMedis.keterangan}
            InputProps={{
              readOnly: true,
            }}
          />
          {this.state.obat.map((val, idx) => {
            let obatID = `${idx}`;
            return (
              <div key={idx}>
                <TextField
                  style={{ marginBottom: "20px", width: "260px" }}
                  id={obatID}
                  required
                  multiline
                  variant="outlined"
                  name="namaObat"
                  type="text"
                  label={`Nama Obat-${idx + 1}`}
                  defaultValue={val.namaObat}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  style={{
                    marginBottom: "20px",
                    marginLeft: "20px",
                    width: "260px",
                  }}
                  id={obatID}
                  required
                  multiline
                  variant="outlined"
                  name="jadwal"
                  type="text"
                  label={`Jadwal Minum Obat-${idx + 1}`}
                  defaultValue={val.jadwal}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            );
          })}
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
      <Card style={{ margin: "50px auto", maxWidth: "600px" }}>
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
            id="email"
            name="email"
            type="text"
            label="Email"
            fullWidth
            defaultValue={pasien.gmail}
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
            multiline
            rows={2}
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
      <div>
        <Card
          style={{
            margin: "20px auto",
            maxWidth: "1000px",
            position: "relative",
            display: "flex",
          }}
        >
          <CardMedia
            style={{ minWidth: "150px" }}
            image={pasien.photoURL}
            title="User photo"
          />
          {/* {console.log(
              dayjs(periksa.waktuPeriksa).format("HH:mm, DD MMMM YYYY")
            )} */}
          <CardContent
            style={{
              flex: 1,
            }}
          >
            {/* <img
              alt=""
              src={pasien.photoURL}
              width="50px"
              style={{ float: "left", marginRight: "10px" }}
            /> */}
            <div style={{ textAlign: "left" }}>
              <Typography>
                {pasien.nama} {` (${pasien.gmail})`}
              </Typography>
              <Typography>Keluhan: {periksa.keluhan}</Typography>
              <Typography>Jadwal Periksa: {time}</Typography>
              {periksa.waktuPeriksa !== undefined ? (
                <Typography>Waktu Diperiksa: {periksaTime}</Typography>
              ) : null}
            </div>
            {/* <Typography>Waktu Periksa: {periksa.waktuPeriksa}</Typography> */}
            <div style={{ textAlign: "right" }}>
              {periksa.diterima === "menunggu" ? (
                <>
                  <Button
                    style={{
                      backgroundColor: "#e00000",
                      color: "#fff",
                      margin: "10px 0 0 10px",
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
                      margin: "10px 0 0 10px",
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
                <>
                  <Button
                    style={{
                      backgroundColor: "#e00000",
                      color: "#fff",
                      margin: "10px 0 0 10px",
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
                      margin: "10px 0 0 10px",
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
                </>
              ) : null}
              {periksa.rekamMedis.dataPenyakit != null ? (
                <Button
                  style={{
                    backgroundColor: "#e00000",
                    color: "#fff",
                    margin: "10px 0 0 10px",
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

              {periksa.diterima !== "ditolak" ? (
                <Button
                  style={{
                    backgroundColor: "#e00000",
                    color: "#fff",
                    margin: "10px 0 0 10px",
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
            </div>
          </CardContent>
        </Card>
        <Modal
          style={{}}
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
