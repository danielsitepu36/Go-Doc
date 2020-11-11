// import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
// import firestore from '@react-native-firebase/firestore';
import React, {Component, useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
// import {Button} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Home from './home';
import {loadUser, saveUser, clearUser} from '../util/userStorage';
import Art from '../../resource/art1.svg';

GoogleSignin.configure({
  webClientId:
    '1015789846201-ouivu783us3flbfc9rpiplf6ot0mi2oq.apps.googleusercontent.com',
  // offlineAccess: true,
  // scopes: 'https://www.googleapis.com/auth/admin.directory.user.readonly',
});
// async function onGoogleButtonPress() {
//   // Get the users ID token
//   const {idToken} = await GoogleSignin.signIn();

//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(googleCredential);
// }

class GoogleSignIn extends Component {
  //   this.state = {
  //     userinf: null,
  //   };
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  // const [user, setUser] = useState(null);

  getData = async () => {
    try {
      const jsonValue = await loadUser();
      console.log('GET DATA:' + JSON.stringify(jsonValue));
      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      // error reading value
    }
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        user: userInfo,
      });
      saveUser(this.state.user);
      console.log('SIGNED' + JSON.stringify(this.state.user));
    } catch (e) {
      console.log(e);
    }
  };

  getLocalData = async () => {
    try {
      const localData = await this.getData();
      // console.log('MOUNT:', localData);
      // if (localData != null) {
      //   this.setState({
      //     user: localData,
      //   });
      // } else {
      //   this.setState({
      //     user: null,
      //   });
      // }
      // await saveUser(localData);
      console.log('localdata:' + JSON.stringify(localData));
    } catch (e) {
      console.log(e);
    }
  };

  UNSAFE_componentWillMount() {
    this.getLocalData();
  }

  signOut = async () => {
    console.log('SignOut');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await AsyncStorage.clear();
      await clearUser();
      this.setState({
        user: null,
      }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.body}>
        <Text>Login</Text>
        <GoogleSigninButton
          style={{width: 200, height: 50, marginBottom: 20}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => this.signIn()}
        />
        {console.log('USER:', this.state.user)}
        <Text>
          {this.state.user != null
            ? this.state.user.user.name
            : 'Please Sign In'}
        </Text>
        <Button
          title="SignOut"
          style={{
            width: 200,
            marginTop: 10,
          }}
          onPress={() => this.signOut()}
        />
        {/* <Text>{getData() != null ? getData() : 'No Account'}</Text> */}
        <Button
          title="Load"
          style={{width: 200, marginTop: 10}}
          onPress={() => this.getLocalData()}
        />
      </View>
    );
  }
}

export default GoogleSignIn;

const styles = StyleSheet.create({
  body: {
    marginLeft: '25%',
    marginTop: 40,
  },
});
