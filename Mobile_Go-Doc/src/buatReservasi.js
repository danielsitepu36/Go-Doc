import React, {useReducer, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {loadUser, saveUser} from './util/userStorage';

export default function ({route, navigation}) {
  const {dataUser} = route.params;
  const db = firestore();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_DOCTOR':
          let doctor = action.doctors;
          let objDokter = [];
          doctor.forEach((obj) => {
            objDokter.push([obj.data, obj.id]);
          });
          return {
            ...prevState,
            doctors: objDokter,
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
    let isSubscribed = true;
    const fetchDoctor = async () => {
      let theseDoctors = [];
      try {
        if (isSubscribed) {
          await db
            .collection('dokter')
            .where('isVerified', '==', 'true')
            .get()
            .then((data) => {
              // console.log(data);
              data.forEach((doc) => {
                console.log(doc.id);
                let doctor = {
                  data: doc.data(),
                  id: doc.id,
                };
                theseDoctors.push(doctor);
              });
              dispatch({
                type: 'FETCH_DOCTOR',
                doctors: theseDoctors,
              });
            });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchDoctor();
    return function cleanUp() {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <View>
        {/* {console.log('doctors:', state.doctors)} */}
        <Text style={{fontSize: 28, alignSelf: 'center'}}>Daftar Dokter</Text>
        <Text></Text>
        <Text>Pilih dari daftar dokter berikut:</Text>
        <Text></Text>
        {console.log(state.doctors)}
        {state.doctors.map((item, key) => (
          <Button
            key={key}
            title={key + 1 + '. ' + item[0].nama}
            onPress={() =>
              navigation.navigate('JadwalPraktikDokter', {
                dokter: item,
                dataUser: dataUser,
              })
            }
          />
        ))}
      </View>
    </>
  );
}
