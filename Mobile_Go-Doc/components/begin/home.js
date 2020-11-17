import React, {Component} from 'react';
import {Text} from 'react-native';
import HomeAdmin from '../admin/homeAdmin';
import HomeDokter from '../dokter/homeDokter';
import HomePasien from '../pasien/homePasien';
// import Router from './router';

class Home extends Component {
  render() {
    return (
      <>
        <HomePasien />
        {/* <Router /> */}
      </>
    );
  }
}

export default Home;
