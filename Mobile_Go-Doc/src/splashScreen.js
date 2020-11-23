import React from 'react';
import {View, StyleSheet} from 'react-native';

import Logo from '../resource/logo.svg';

export default function SplashScreen({navigation}) {
  return (
    <>
      <View style={styles.logo}>
        <Logo />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
