import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../home';
import LoginFunct from '../loginFunct';
import Periksa from '../periksa';
import SplashScreen from '../splashScreen';
import ListPeriksaAktif from '../listPeriksaAktif';

const Stack = createStackNavigator();

const dasar = (
  <>
    <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
    <Stack.Screen
      name="Periksa"
      component={Periksa}
      options={{title: 'Periksa'}}
    />
    <Stack.Screen
      name="ListPeriksaAktif"
      component={ListPeriksaAktif}
      options={{title: 'Daftar Periksa Aktif'}}
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function SplashScreenRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
