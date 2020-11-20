import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { firebaseConfig, db } from "../util/config";

class Periksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rekamMedis: {
        dataPenyakit: "sehat",
        keterangan: "harusnya",
      },
    };
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
    await db
      .doc(`/periksa/${this.props.periksa.id}`)
      .update({ rekamMedis: this.state.rekamMedis });
  }

  render() {
    const periksa = this.props.periksa;
    return (
      <Card style={{ marginBottom: "30px", maxWidth: "600px" }}>
        <CardContent>
          <Typography>{periksa.namaPasien}</Typography>
          <Typography>{periksa.keluhan}</Typography>
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
          {periksa.diterima == "diterima" &&
          periksa.rekamMedis.dataPenyakit == null ? (
            <Button size="small" onClick={() => this.buatRekamMedis()}>
              Buat Rekam Medis
            </Button>
          ) : null}
          {periksa.rekamMedis.dataPenyakit != null ? (
            <Button size="small">Cek Rekam Medis</Button>
          ) : null}
        </CardActions>
        {/* ) : null} */}
      </Card>
    );
  }
}
export default Periksa;
