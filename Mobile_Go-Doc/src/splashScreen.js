import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import GodocLogo from '../resource/GodocLogo.png';

export default function SplashScreen({navigation}) {
  return (
    <>
      <View style={styles.logo}>
        <Image
          source={GodocLogo}
          resizeMode="contain"
          style={{width: '70%', height: '70%'}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
