import {
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { db } from "../util/config";
import React, { Component } from "react";
import HomeNavbar from "../components/layout/HomeNavbar";
import WaitVerified from "./verify/WaitVerified";

const kelamin = [
  { value: "Laki-laki", label: "Laki-laki" },
  { value: "Perempuan", label: "Perempuan" },
];

class DataDokter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: this.props.dokter,
      uid: this.props.uid,
      submitted: false,
      nama: this.props.dokter.nama,
      tanggalLahir: "1990-01-01",
      jenisKelamin: "Laki-laki",
      str: "",
      tempatPraktek: "",
      spesialisasi: "",
      sesiPeriksa: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  lengkapiData = async (event) => {
    event.preventDefault();
    await db.doc(`/dokter/${this.state.uid}`).update({
      nama: this.state.nama,
      str: this.state.str,
      spesialisasi: this.state.spesialisasi,
      tanggalLahir: this.state.tanggalLahir,
      jenisKelamin: this.state.jenisKelamin,
      tempatPraktek: this.state.tempatPraktek,
      sesiPeriksa: this.state.sesiPeriksa,
      isVerified: "menunggu",
    });
    this.setState({
      submitted: true,
    });
  };

  render() {
    return (
      <div>
        {this.state.submitted === true ? (
          <WaitVerified />
        ) : (
          <div>
            <HomeNavbar />
            <Card style={{ margin: "100px auto", width: "500px" }}>
              <CardContent>
                <form
                  style={{ textAlign: "center" }}
                  onSubmit={this.lengkapiData}
                >
                  <Typography variant="h4">Data Diri Dokter</Typography>
                  <TextField
                    id="nama"
                    name="nama"
                    type="text"
                    label="Nama Lengkap"
                    fullWidth
                    required
                    value={this.state.nama}
                    onChange={this.handleChange}
                    style={{ marginTop: "15px" }}
                  />
                  <TextField
                    id="tanggalLahir"
                    name="tanggalLahir"
                    type="date"
                    label="Tanggal Lahir"
                    value={this.state.tanggalLahir}
                    onChange={this.handleChange}
                    style={{ marginTop: "15px" }}
                    fullWidth
                    required
                  />
                  <TextField
                    id="jenisKelamin"
                    name="jenisKelamin"
                    select
                    label="Jenis Kelamin"
                    value={this.state.jenisKelamin}
                    onChange={this.handleChange}
                    fullWidth
                    required
                    style={{ marginTop: "15px", textAlign: "left" }}
                  >
                    {kelamin.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="str"
                    name="str"
                    type="text"
                    label="Nomor STR"
                    fullWidth
                    required
                    value={this.state.str}
                    onChange={this.handleChange}
                    style={{ marginTop: "15px" }}
                  />
                  <TextField
                    id="tempatPraktek"
                    name="tempatPraktek"
                    type="text"
                    label="Alamat Praktek"
                    multiline
                    rows={2}
                    fullWidth
                    required
                    value={this.state.tempatPraktek}
                    onChange={this.handleChange}
                    style={{ marginTop: "15px" }}
                  />
                  <TextField
                    id="sesiPeriksa"
                    name="sesiPeriksa"
                    type="text"
                    label="Jadwal Sesi Periksa"
                    fullWidth
                    required
                    value={this.state.sesiPeriksa}
                    onChange={this.handleChange}
                    style={{ marginTop: "15px" }}
                  />
                  <TextField
                    id="spesialisasi"
                    name="spesialisasi"
                    type="text"
                    label="Spesialisasi"
                    fullWidth
                    required
                    value={this.state.spesialisasi}
                    onChange={this.handleChange}
                    style={{ marginTop: "15px" }}
                  />
                  <div style={{ marginTop: "15px" }}>
                    <Typography variant="caption">
                      Mohon cek kembali dengan teliti, karena data diri dokter
                      ini akan digunakan admin untuk memverifikasi
                    </Typography>
                  </div>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#e00000",
                      color: "#fff",
                      marginTop: "10px",
                      padding: "8px 15px",
                    }}
                  >
                    Kirim Data
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default DataDokter;
