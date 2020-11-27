import React, {useReducer, useEffect} from 'react';
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button, Text, Card, ThemeProvider, Icon} from 'react-native-elements';

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

  const MyCard = (item, key) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('JadwalPraktikDokter', {
          dokter: item,
          dataUser: dataUser,
        })
      }>
      <Card containerStyle={{height: 100}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Image
              source={{uri: item[0].photoURL}}
              resizeMode="contain"
              style={{width: 70, height: 70}}
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text h4 h4Style={{fontSize: 14}}>
              {item[0].nama}
            </Text>
            <Text>Spesialisasi: {item[0].spesialisasi}</Text>
            <Text>Alamat Praktek: {item[0].tempatPraktek}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <>
      <ThemeProvider>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            flex: 1,
          }}>
            <View style={{maxHeight: '15%'}}>

          {/* {console.log('doctors:', state.doctors)} */}
          <Text style={{fontSize: 28, alignSelf: 'center', fontWeight: 'bold'}}>
            Daftar Dokter
          </Text>
          <Text></Text>
          <Text style={{fontSize: 18, marginLeft: 20}}>
            Pilih dari daftar dokter berikut:
          </Text>
          </View>

          {console.log(state.doctors)}
          <View style={{maxHeight: '85%'}}>
            <FlatList
              data={state.doctors}
              keyExtractor={(item) => item[1]}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('JadwalPraktikDokter', {
                        dokter: item,
                        dataUser: dataUser,
                      })
                    }>
                    <Card containerStyle={{height: 100}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View>
                          <Image
                            source={{uri: item[0].photoURL}}
                            resizeMode="contain"
                            style={{width: 70, height: 70}}
                          />
                        </View>
                        <View style={{marginLeft: 20, maxWidth: "70%"}}>
                          <Text h4 h4Style={{fontSize: 14}}>
                            {item[0].nama}
                          </Text>
                          <Text>Spesialisasi: {item[0].spesialisasi}</Text>
                          <Text>Alamat Praktek: {item[0].tempatPraktek}</Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }}>
              {/* {state.doctors.map((item, key) => MyCard(item, key))} */}
            </FlatList>
          </View>
        </View>
      </ThemeProvider>
    </>
  );
}
