import React, {Component} from 'react';
import {Text} from 'react-native';

import BottomMenu from './bottomMenu';

class HomePasien extends Component {
  render() {
    return (
      <>
        <Text>Home Pasien</Text>
        <BottomMenu />
      </>
    );
  }
}

export default HomePasien;
