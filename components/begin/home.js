import React, {Component} from 'react';
import {Text} from 'react-native';
import HomeAdmin from '../admin/homeAdmin';
import HomeDokter from '../dokter/homeDokter';
import HomePasien from '../pasien/homePasien';

class Home extends Component {
  render() {
    return <HomePasien />;
  }
}

export default Home;
