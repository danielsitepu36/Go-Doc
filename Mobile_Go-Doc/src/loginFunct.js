import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Button, Text, Card, ThemeProvider} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import GodocLogo from '../resource/GodocLogo.png';

import {loadUser, saveUser, clearUser} from './util/userStorage';
import {CommonActions} from '@react-navigation/native';

const GodocArt = require('../resource/GodocArt.png');

export default function LoginFunct({navigation}) {
  // const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState({});

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      // setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function onAuthStateChanged(user) {
    // console.log("USER=",user)
    await firestore()
      .collection('pasien')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('oldUser:' + doc)
          return doc._data;
        } else {
          const newUser = {
            nama: user.displayName,
            gmail: user.email,
            photoURL: user.photoURL,
            umur: '',
            alamat: '',
            noTelp: '',
          };
          console.log('uid: ' + user.uid);
          firestore().collection('pasien').doc(user.uid).set(newUser);
          // console.log('newUser:' + newUser)
          return newUser;
        }
      })
      .then((data) => {
        console.log('SETUSER: ', data);
        setUser(data);
        saveUser(data);
        console.log('will pass user:', user);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home', params: {passedUser: data}}],
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
    // if (user) setloggedIn(true);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1015789846201-ouivu783us3flbfc9rpiplf6ot0mi2oq.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      <View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 100,
            alignItems: 'center',
          }}>
          <View style={{height: 270}}>
            <Image
              source={GodocArt}
              style={{width: 295, height:220}}
              // resizeMode="center"
            />
          </View>
          <View>
            <GoogleSigninButton
              style={{width: 250, height: 48, alignSelf: 'center'}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.White}
              onPress={_signIn}
            />
          </View>
        </View>
        {/* <View>{!user && <Text>You are currently logged out</Text>}</View> */}
      </View>
    </>
  );
}
