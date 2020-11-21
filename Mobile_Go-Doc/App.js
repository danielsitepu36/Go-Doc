import 'react-native-gesture-handler';
import React, {Component, useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {loadUser} from './src/util/userStorage';
import LoginFunct from './src/loginFunct';
import Home from './src/home';
import SplashScreen from './src/splashScreen';

const Stack = createStackNavigator();

function App({navigation}) {
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
      }
    },
    {
      loading: true,
      isLogin: false,
      user: {},
    },
  );

  useEffect(() => {
    const fetchData = () => {
      let userData;
      let loggedIn;
      try {
        setTimeout(() => {
          loadUser().then((data) => {
            if (data) {
              console.log(data);
              userData = data;
              loggedIn = true;
            }
            dispatch({
              type: 'FETCH_CREDS',
              user: userData,
              loading: false,
              isLogin: loggedIn,
            });
          });
        }, 1500);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!state.loading ? (
          state.isLogin ? (
            <>
              {console.log(state.isLogin)}
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: 'Home',
                }}
              />
              <Stack.Screen
                name="LoginFunct"
                component={LoginFunct}
                options={{
                  title: 'Sign In',
                }}
              />
            </>
          ) : (
            <>
              {console.log(state.isLogin)}
              <Stack.Screen
                name="LoginFunct"
                component={LoginFunct}
                options={{
                  title: 'Sign In',
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: 'Home',
                }}
              />
            </>
          )
        ) : (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
