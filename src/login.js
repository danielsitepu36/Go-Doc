import React, {Component, useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '1015789846201-ouivu783us3flbfc9rpiplf6ot0mi2oq.apps.googleusercontent.com',
});


function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
  {
    // console.log(user);
  }
  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }

  getFirestore = async () => {
    const usersCollection = firestore()
      .collection('dokter')
      .onSnapshot((snapshot) => {
        // let list_kosong = []
        snapshot.forEach((doc) => {
          const userData = doc.data();
          console.log("data = ",userData);
          // list_kosong.push(userData);
        });
      });
  };

  componentDidMount() {
    // this.getFirestore();
    // console.log(this.state.user)
  };

  // signInAnonymous = async () => {
  //   await auth()
  //     .signInAnonymously()
  //     .then(() => {
  //       console.log('User signed in anonymously');
  //     })
  //     .catch((error) => {
  //       if (error.code === 'auth/operation-not-allowed') {
  //         console.log('Enable anonymous in your firebase console.');
  //       }

  //       console.error(error);
  //     });
  // };

  // createUser = () => {
  //   auth()
  // .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  // .then(() => {
  //   console.log('User account created & signed in!');
  // })
  // .catch(error => {
  //   if (error.code === 'auth/email-already-in-use') {
  //     console.log('That email address is already in use!');
  //   }

  //   if (error.code === 'auth/invalid-email') {
  //     console.log('That email address is invalid!');
  //   }

  //   console.error(error);
  // });
  // }

  signOut = async () => {
    this.setState({
      user: {},
    })
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    await GoogleSignin.signOut();
  };

  onGoogleButtonPress = async () => {

    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    let user={};
    await auth().signInWithCredential(googleCredential)
    .then((data) => {
      user = data.user;
    })
    // console.log("UID = ", user.uid)
    await firestore()
    .collection('pasien')
    .doc(user.uid)
    .get()
    .then((doc)=>{
      if(doc.exists){
        // console.log('oldUser:' + doc)
        return doc;
      } else {
        const newUser = {
          nama: user.displayName,
          gmail: user.email,
          photoURL: user.photoURL,
          umur:"",
          alamat:"",
          noTelp:"",
        };
        console.log('uid: ' + user.uid)
        firestore()
        .collection('pasien')
        .doc(user.uid)
        .set(newUser)
        // console.log('newUser:' + newUser)
        return newUser;
      }
    })
    .then((data) => {
      console.log('DATA:'+ JSON.stringify(data._data))
      this.setState({
        user: data._data
      })
    })
    .catch((err) => {
      console.log(err)
    });

    // await auth().signInWithCredential(googleCredential)
    // .then((data) => {
    //   const user = data.user;
    //   const userDoc = firestore()
    //   .collection('pasien')
    //   .doc(user.uid)
    //   .get()
    //   // console.log('userDoc=',userDoc)
    //   if(!userDoc.exists){
    //     const newUser = {
    //       nama: user.displayName,
    //       gmail: user.email,
    //       photoURL: user.photoURL,
    //       umur:"",
    //       alamat:"",
    //       noTelp:"",
    //     };
    //     console.log('uid: ' + user.uid)
    //     firestore()
    //     .collection('pasien')
    //     .doc(user.uid)
    //     .set(newUser)
    //     console.log('newUser:' + newUser)
    //     return newUser;
    //   } else {
    //     console.log('oldUser:' + userDoc)
    //     return userDoc;
    //   }
    // })
    // .catch((err) => {
    //   console.log(err)
    // });
    // Sign-in the user with the credential
    // return ;
  };

  render() {
    return (
      <>
        <Button
          title="Google Sign-In"
          onPress={() =>
            this.onGoogleButtonPress().then(() => {console.log("signed-in with google")})
          }
        />
        <Text>{this.state.user.nama}</Text>
        {/* <Button
        title="Sign-In"
        onPress={this.createUser}
      /> */}
        <Button title="Sign-Out" onPress={this.signOut} />
        <LoginApp />
      </>
    );
  }
}
