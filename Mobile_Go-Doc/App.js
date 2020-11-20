import 'react-native-gesture-handler';
import React, {Component, useEffect, useReducer} from 'react';
import {loadUser} from './src/util/userStorage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginFunct from './src/loginFunct';
import Home from './src/home';
import SplashScreen from './src/splashScreen';

const Stack = createStackNavigator();

function Navigator({navigation}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_CREDS':
          return {
            ...prevState,
            user: action.user,
            loading: false,
            isLogin: action.isLogin,
          };
        case 'LOGGED_IN':
          return {
            ...prevState,
            isLogin: action.loggedIn,
          };
      }
    },
    {
      loading: true,
      isLogin: false,
      user: null,
    },
  );

  useEffect(() => {
    const fetchData = () => {
      let userData;
      try {
        // setTimeout(() => {
        loadUser().then((data) => {
          if (data) {
            console.log(data);
            userData = data;
          }
        });
        // }, 2000);
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: 'FETCH_CREDS',
        user: userData,
        loading: false,
      });
    };
    fetchData();
    return () => dispatch({type: 'LOGGED_IN', loggedIn: true});
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={state.isLogin ? 'Home' : 'LoginFunct'}>
        {!state.loading ? (
          <>
            {console.log('login?:', state.isLogin)}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Home',
                // animationTypeForReplace: 'pop',
              }}
            />
            <Stack.Screen
              name="LoginFunct"
              component={LoginFunct}
              options={{
                title: 'Sign In',
                // animationTypeForReplace: 'pop',
              }}
            />
          </>
        ) : (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;
