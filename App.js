import React, {Component, useState} from 'react';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './components/begin/splashScreen';
import Home from './components/begin/home';
import HomeAdmin from './components/admin/homeAdmin';
import HomeDokter from './components/dokter/homeDokter';
import HomePasien from './components/pasien/homePasien';

const Stack = createStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          /> */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HomePasien" component={HomePasien} />
          <Stack.Screen name="HomeDokter" component={HomeDokter} />
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
