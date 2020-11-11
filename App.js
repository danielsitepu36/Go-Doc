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

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: true};
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      // <Router />
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
            component={HomePasien}
            options={{
              title: 'Home',
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

export default App;
