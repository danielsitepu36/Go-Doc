import React, {Component, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import navigationRef from '../RootNavigation';

import Logo from '../../resource/logo.svg';
import Home from './home';
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

// class SplashScreen extends Component {
//     async componentDidMount() {
//       const data = await this.performTimeConsumingTask();

//       if (data !== null) {
//         // alert('Moved to next Screen here');
//         useNavigation().navigate('Home');
//       }
//     }
//     performTimeConsumingTask = async () => {
//       return new Promise((resolve) =>
//         setTimeout(() => {
//           resolve('result');
//         }, 3000),
//       );
//     };

//     render() {
//       const {navigation} = this.props;
//       return (
//         <>
//           <View style={styles.logo}>
//             <Logo />
//           </View>
//         </>
//       );
//     }
//   }

//   const styles = StyleSheet.create({
//     logo: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });

//   export default SplashScreen;
