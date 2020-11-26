import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../home';
import LoginFunct from '../loginFunct';
import Periksa from '../periksa';
import SplashScreen from '../splashScreen';
import ListPeriksaAktif from '../listPeriksaAktif';
import BuatReservasi from '../buatReservasi';
import JadwalPraktikDokter from '../jadwalPraktikDokter';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const dasar = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        headerStyle: {
          backgroundColor: '#e00000',
        },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="Periksa"
      component={Periksa}
      options={{
        title: 'Periksa',
        headerStyle: {
          backgroundColor: '#e00000',
        },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="BuatReservasi"
      component={BuatReservasi}
      options={{
        title: 'Periksa',
        headerStyle: {
          backgroundColor: '#e00000',
        },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="ListPeriksaAktif"
      component={ListPeriksaAktif}
      options={{
        title: 'Periksa',
        headerStyle: {
          backgroundColor: '#e00000',
        },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="JadwalPraktikDokter"
      component={JadwalPraktikDokter}
      options={{
        title: 'Periksa',
        headerStyle: {
          backgroundColor: '#e00000',
        },
        headerTintColor: '#fff',
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
            headerStyle: {
              backgroundColor: '#e00000',
            },
            headerTintColor: '#fff',
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
            headerStyle: {
              backgroundColor: '#e00000',
            },
            headerTintColor: '#fff',
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
