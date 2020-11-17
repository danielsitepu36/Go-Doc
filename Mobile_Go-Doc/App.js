import React, {Component, useState} from 'react';
import {loadUser} from './src/util/userStorage';
import LoginFunct from './src/loginFunct';
import Home from './src/home';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isLogin: false,
      user: {},
    };
  }

  componentDidMount() {
    // const savedUser = loadUser();
    loadUser().then((savedUser) => {
      if (savedUser) {
        this.setState({user: savedUser, isLogin: true});
        console.log('SAVED_USER: ', savedUser);
      }
    });
  }

  render() {
    const {loading, isLogin, user} = this.state;
    if (isLogin) {
      return <Home />;
    } else {
      return <LoginFunct />;
    }
  }
}
