import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {webClientId} from './util/config';
import {loadUser, clearUser} from './util/userStorage';
import {CommonActions} from '@react-navigation/native';
import {Button, Text, Card, ThemeProvider} from 'react-native-elements';

GoogleSignin.configure({
  webClientId: webClientId,
});

export default function Home({route, navigation}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = () => {
      try {
        loadUser().then((data) => {
          setUser(JSON.parse(data));
        });
      } catch (e) {
        console.log('fetch data error from home');
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      setUser({});
      clearUser();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'LoginFunct'}],
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ThemeProvider>
        <Text h2>Welcome, {user.nama}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Periksa', {dataUser: user})}>
          <Card>
            <Card.Title>HELLO WORLD</Card.Title>
            <Text style={{marginBottom: 10}}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity>
          <Button
            onPress={() => navigation.navigate('Periksa', {dataUser: user})}
            title="Periksa"
          />
          <Button onPress={signOut} title="Sign Out" />
        </TouchableOpacity>
      </ThemeProvider>
    </>
  );
}
