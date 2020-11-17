import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './home';
import Login from './login';
import {View, Image} from 'react-native';

const Tab = createBottomTabNavigator();

const IconBottom = (props) => {
  const {color, focused} = props.data;
  let colorSelected = focused ? color : 'grey';
  return (
    <View>
      <Image
        source={props.image}
        style={{width: 40, height: 40, tintColor: colorSelected}}
      />
    </View>
  );
};

const Router = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
        style: {height: 120},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Rumah',
          // tabBarIcon: (props) => (
          //     <IconBottom data={props} image={require('./home.png')} />
          // )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Login}
        options={{
          title: 'Login',
          // tabBarIcon: (props) => (
          //     <IconBottom data={props} image={require('./profile.png')} />
          // )
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Router;
