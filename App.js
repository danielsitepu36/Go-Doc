import React, {Component, useState} from 'react';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from './components/begin/splashScreen';
import Home from './components/begin/home';
import HomeAdmin from './components/admin/homeAdmin';
import HomeDokter from './components/dokter/homeDokter';
import HomePasien from './components/pasien/homePasien';
import Router from './components/begin/router';
import * as RouteNavigator from './components/RootNavigation';
import Login from './components/begin/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: implement login
// Jadi flownya gini
// 1) Open app, cek localStorage, kalo ada dia ga lewat login
// 2) Kalo belom login, ke login (Ini 1 2 ditaruh di App / splash)
// 3) Habis login, datanya dimasukin firebase & local (ini di login)
// dah
// Prioritas: Firestore akses & login
// Kalau mau sebenernya bikin screen menu dulu aja.. passing user bisa blakang
// Jadi yg penting kita bisa liat list kategori & jadwal dokter
// User kosongan gapap
// At least ada fitur useful disini yg bisa dikumpul

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default class App extends Component {
  state = {
    userinf: null,
  };
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  render() {
    // if (this.state.isLoading) {
    //   return <SplashScreen />;
    // }
    // if (this.data !== null) {
    // this.props.navigation.navigate('Home');
    // // <Router />
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomePasien"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#E00000',
            },
            headerTintColor: '#fff',
          }}>
          {/* <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            /> */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'My home',
            }}
          />
          <Stack.Screen
            name="HomePasien"
            component={Login}
            options={{
              title: 'Login',
            }}
          />
          <Stack.Screen
            name="HomeDokter"
            component={HomeDokter}
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="HomeAdmin"
            component={HomeAdmin}
            options={{
              title: 'Home',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
// }

// const AppContainer = createAppContainer(InitialNavigator);

// class App extends React.Component {
//   render() {
//     return (
//       <Provider>
//         <AppContainer />
//       </Provider>
//     );
//   }
// }

// export default App;
