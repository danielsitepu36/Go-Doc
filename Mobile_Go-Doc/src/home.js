import React, {Component} from 'react';
import {Text, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {loadUser, clearUser} from './util/userStorage';
import { CommonActions } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId:
    '1015789846201-ouivu783us3flbfc9rpiplf6ot0mi2oq.apps.googleusercontent.com',
});

export default class Home extends Component {
  // const [user, setUser] = useState();
  constructor(props) {
    super(props);
    // console.log('screen:', this.props);
    this.state = {
      user: {},
      isLoggedIn: false,
    };
  }

  onComponentDidMount() {
    loadUser().then((data) => {
      this.setState({user: data, isLoggedIn: true});
    });
  }
  signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      this.setState({user: {}, isLoggedIn: false});
      clearUser();
      this.props.navigation.dispatch(CommonActions.reset({
        index: 1,
        routes: [ { name: 'LoginFunct' }]
      }));
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <>
        <Text>Home Pasien</Text>
        <TouchableOpacity>
          <Button onPress={this.signOut} title="Sign Out" />
        </TouchableOpacity>
      </>
    );
  }
}
