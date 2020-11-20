import React, {Component, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Logo from '../resource/logo.svg';
// const performTimeConsumingTask = async () => {
//   return await new Promise((resolve) =>
//     setTimeout(() => {
//       resolve('result');
//     }, 3000),
//   );
// };
// const wait = async () => {
//   const data = await performTimeConsumingTask();

//   if (data !== null) {
//     // alert('Moved to next Screen here');
//     navigation.navigate('Home');
//   }
// };
export default function SplashScreen({navigation}) {
  // const data = performTimeConsumingTask;
  return (
    <>
      <View style={styles.logo}>
        <Logo />
      </View>
      {/* {performTimeConsumingTask() && navigation.navigate('Home')} */}
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
