import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-community/google-signin';
import {webClientId} from './config';

import {clearUser} from './userStorage';

import Home from '../home';
import LoginFunct from '../loginFunct';
import Periksa from '../periksa';
import SplashScreen from '../splashScreen';
import ListPeriksaAktif from '../listPeriksaAktif';
import BuatReservasi from '../buatReservasi';
import JadwalPraktikDokter from '../jadwalPraktikDokter';
import UpdateProfil from '../updateProfil';
import {Button} from 'react-native';
import {CommonActions} from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: webClientId,
});

const Stack = createStackNavigator();

const opt = {
  headerStyle: {
    backgroundColor: '#e00000',
  },
  headerTintColor: '#fff',
};

const signOut = async (navigation) => {
  // navigation.navigate('LoginFunct')
  try {
    await GoogleSignin.signOut();
    auth()
      .signOut()
      .then(() => alert('Your are signed out!'));
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

const MyButton = (navigation) => (
  <Button
    onPress={() => {
      signOut(navigation);
    }}
    title="Logout"
    color="#e00000">
    LogOut
  </Button>
);

const dasar = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({navigation, route}) => ({
        title: 'Home',
        headerRight: () => MyButton(navigation),
        ...opt,
      })}
    />
    <Stack.Screen
      name="Periksa"
      component={Periksa}
      options={{
        title: 'Periksa',
        headerRight: () => MyButton,
        ...opt,
      }}
    />
    <Stack.Screen
      name="BuatReservasi"
      component={BuatReservasi}
      options={{
        title: 'Periksa',
        headerRight: () => MyButton,
        ...opt,
      }}
    />
    <Stack.Screen
      name="ListPeriksaAktif"
      component={ListPeriksaAktif}
      options={{
        title: 'Periksa',
        headerRight: () => MyButton,
        ...opt,
      }}
    />
    <Stack.Screen
      name="JadwalPraktikDokter"
      component={JadwalPraktikDokter}
      options={{
        title: 'Periksa',
        headerRight: () => MyButton,
        ...opt,
      }}
    />
    <Stack.Screen
      name="UpdateProfil"
      component={UpdateProfil}
      options={{
        title: 'Update Profil',
        headerRight: () => MyButton,
        ...opt,
      }}
    />
  </>
);

export function LoginRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginFunct"
          component={LoginFunct}
          options={{
            title: 'Sign In',
            ...opt,
            headerShown: false,
          }}
        />
        {dasar}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function HomeRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {dasar}
        <Stack.Screen
          name="LoginFunct"
          component={LoginFunct}
          options={{
            title: 'Sign In',
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
            ...opt,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function SplashScreenRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
