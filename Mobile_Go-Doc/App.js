import 'react-native-gesture-handler';
import React, {useEffect, useReducer} from 'react';

import {loadUser} from './src/util/userStorage';

import {LoginRouter, HomeRouter, SplashScreenRouter} from './src/util/mainRouter';

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

  return !state.loading ? (
    state.isLogin ? (
      <>
        {console.log(state.isLogin)}

        <HomeRouter />
      </>
    ) : (
      <>
        {console.log(state.isLogin)}
        <LoginRouter />
      </>
    )
  ) : (
    <SplashScreenRouter />
  );
}
export default App;
