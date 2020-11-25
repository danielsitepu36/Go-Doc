import React, {useReducer, useEffect} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {loadUser, saveUser} from './util/userStorage';

export default function ({navigation}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_DOCTOR':
          let doctor = action.data;
          return {
            ...prevState,
            doctors: {...state.doctors, doctor},
          };
        case 'FETCH_USER':
          return {
            ...prevState,
            user: action.user,
          };
      }
    },
    {
      user: {},
      doctors: [],
    },
  );

  useEffect(() => {
    const fetchData = () => {
      let userData;
      try {
        loadUser().then((data) => {
          if (data) {
            console.log(data);
            userData = data;
            dispatch({
              type: 'FETCH_USER',
              user: userData,
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDoctor = async () => {
      let doctors;
      try {
        doctors = await firestore()
          .collection('dokter')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              dispatch({
                type: 'FETCH_DOCTOR',
                data: documentSnapshot,
              });
            });
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchDoctor();
  });

  return (
    <>
      <View>
          {console.log('doctors:', state.doctors)}
        <Text>{state.doctors}</Text>
      </View>
    </>
  );
}
