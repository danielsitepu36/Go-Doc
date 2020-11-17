import React, {Component, useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import Home from './home';
import Art from '../resource/art1.svg';

import {loadUser, saveUser, clearUser} from './util/userStorage';

export default function LoginFunct() {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState({});

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);

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
      })
      .catch((err) => {
        console.log(err);
      });
    if (user) setloggedIn(true);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1015789846201-ouivu783us3flbfc9rpiplf6ot0mi2oq.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      setloggedIn(false);
      setUser({});
      clearUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View>
        <View>
          <View>
            <Art />
          </View>
          {!loggedIn && (
            <GoogleSigninButton
              style={{width: 250, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.White}
              onPress={_signIn}
            />
          )}
        </View>
        <View>
          {!user && <Text>You are currently logged out</Text>}
          {user && (
            <View>
              <Text>Welcome {user.nama}</Text>
              <Button onPress={signOut} title="LogOut" color="red"></Button>
            </View>
          )}
        </View>
      </View>
    </>
  );
}