import React, {Component} from 'react';
import {Text} from 'react-native';
import homeAdmin from '../admin/homeAdmin';
import homeDokter from '../admin/homeDokter';
import homePasien from '../admin/homePasien';

class Home extends Component {
  render() {
    return <homePasien />;
  }
}

export default Home;
