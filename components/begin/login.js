// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from '@react-native-community/google-signin';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import Art from '../../resource/art1.svg';

// import {Text, View, StyleSheet} from 'react-native';
// import {Button} from 'react-native-elements';
// import Home from './home';

// GoogleSignin.configure({
//   // webClientId:'143097564914-u59plvqp16dse79tcrqdqoiqovnied2i.apps.googleusercontent.com',
// });

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text>Selamat Datang di Go-Doc</Text>
        {/* <Art /> */}
        {/* <GoogleSigninButton /> */}
      </View>
    );
  }
}

// class Login extends Component {
//   //   this.state = {
//   //     userinf: null,
//   //   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//     };
//   }
//   // const [user, setUser] = useState(null);

//   storeData = async (value) => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem('user', jsonValue);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('user');
//       console.log('GET DATA:' + jsonValue);
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//       // error reading value
//     }
//   };

//   signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       this.setState({
//         user: userInfo,
//       });
//       await this.storeData(this.state.user);
//       console.log('SIGNED' + this.state.user);
//       return <Home user={user} />;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   getLocalData = async () => {
//     try {
//       const localData = await this.getData();
//       console.log('MOUNT:', localData);
//       if (localData != null) {
//         this.setState({
//           user: localData,
//         });
//       } else {
//         this.setState({
//           user: null,
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   UNSAFE_componentWillMount() {
//     this.getLocalData();
//   }

//   signOut = async () => {
//     console.log('SignOut');
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       await AsyncStorage.clear();
//       this.setState({
//         user: null,
//       }); // Remember to remove the user from your app's state as well
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   render() {
//     return (
//       <View style={styles.body}>
//         <Text>Login</Text>
//         <GoogleSigninButton
//           style={{width: 200, height: 50, marginBottom: 20}}
//           size={GoogleSigninButton.Size.Wide}
//           color={GoogleSigninButton.Color.Light}
//           onPress={() => this.signIn()}
//         />
//         {console.log('USER:', this.state.user)}
//         <Text>
//           {this.state.user != null
//             ? this.state.user.user.name
//             : 'Please Sign In'}
//         </Text>
//         <Button
//           title="SignOut"
//           buttonStyle={{
//             width: 200,
//             marginTop: 10,
//           }}
//           onPress={() => this.signOut()}
//         />
//         {/* <Text>{getData() != null ? getData() : 'No Account'}</Text> */}
//         <Button
//           title="Load"
//           buttonStyle={{
//             width: 200,
//             marginTop: 10,
//           }}
//           onPress={() => this.getLocalData()}
//         />
//       </View>
//     );
//   }
// }

// export default Login;
