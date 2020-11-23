import React, {useReducer, useEffect} from 'react';
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {loadUser, saveUser} from './util/userStorage';

export default function ({navigation}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_DOCTOR':
          return {
            ...prevState,
            doctors: action.doctor,
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
      doctors: {},
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
          }
          dispatch({
            type: 'FETCH_USER',
            user: userData,
          });
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

//   useEffect(() => {
//     const fetchDoctor = () => {
//       let doctors;
//       try {
//         firestore().collection();
//       } catch (e) {
//         console.log(e);
//       }
//     };
//   });

  return (
    <>
      <View>
        <Text></Text>
      </View>
    </>
  );
}
