import React, {useEffect, useReducer, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Text, Card} from 'react-native-elements';

export default function ListPeriksaAktif({route, navigation}) {
  const db = firestore();
  const {dataUser, diterima} = route.params;
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_PERIKSA':
          return {
            ...prevState,
            daftarPeriksa: action.periksa,
          };
        case 'SET_UID':
          return {
            ...prevState,
            userId: action.UID,
          };
        case 'FETCH_DOKTER':
          return {
            ...prevState,
            dokter: action.listDokter,
          };
        case 'SET_TITLE':
          return {
            ...prevState,
            title: action.title,
          };
      }
    },
    {
      daftarPeriksa: [],
      dokter: [],
      userId: '',
      title: '',
    },
  );

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      console.log('email: ', dataUser.gmail);
      try {
        db.collection('pasien')
          .where('gmail', '==', dataUser.gmail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // setUID(doc.id);
              dispatch({type: 'SET_UID', UID: doc.id});
            });
          });
      } catch (e) {
        console.log(e);
      }
      console.log('UID:', state.userId, '=> gmail: ', dataUser.gmail);
    };
    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    async function fetchDokter() {
      let listDokter = [];
      try {
        await db
          .collection('dokter')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((item) => {
              listDokter.push([item.data(), item.id]);
            });
            dispatch({type: 'FETCH_DOKTER', listDokter: listDokter});
          });
      } catch (e) {
        console.error(e);
      }
    }
    fetchDokter();
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (diterima) {
      dispatch({type: 'SET_TITLE', title: 'Riwayat Periksa'});
      async function fetchPeriksa() {
        let listPeriksa = [];
        try {
          await db
            .collection('periksa')
            .where('idPasien', '==', state.userId)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log('doc.data', doc.data());
                if (doc.data().diterima !== 'menunggu') {
                  listPeriksa.push([doc.data(), doc.id]);
                }
              });
              dispatch({type: 'FETCH_PERIKSA', periksa: listPeriksa});
            });
        } catch (e) {
          console.error(e);
        }
      }
      fetchPeriksa();
    } else {
      dispatch({type: 'SET_TITLE', title: 'Daftar Reservasi Aktif'});
      async function fetchPeriksa() {
        let listPeriksa = [];
        try {
          await db
            .collection('periksa')
            .where('idPasien', '==', state.userId)
            .where('diterima', '==', 'menunggu')
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log('doc.data', doc.data());
                listPeriksa.push([doc.data(), doc.id]);
              });
              dispatch({type: 'FETCH_PERIKSA', periksa: listPeriksa});
            });
        } catch (e) {
          console.error(e);
        }
      }
      fetchPeriksa();
    }
    return () => {
      isSubscribed = false;
    };
  }, [state.userId]);

  return (
    <View style={{flex: 1}}>
      <View>
        {console.log('uid:', state.userId)}
        {console.log('data:', state.daftarPeriksa)}
        <Text
          style={{
            fontSize: 24,
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          {state.title}
        </Text>
      </View>
      <View style={{flex: 1, maxHeight: '90%'}}>
        <FlatList
          data={state.daftarPeriksa}
          keyExtractor={(item) => item[1]}
          renderItem={({item}) => {
            let date = new Date(item[0].waktuPeriksa);
            console.log(date.toLocaleTimeString());
            let dokter;
            state.dokter.forEach((dok) => {
              if (dok[1] === item[0].idDokter) {
                dokter = dok[0];
              }
            });
            return (
              <TouchableOpacity>
                <Card>
                  <View style={{padding: 5}}>
                    <Text h4 h4Style={{fontSize: 18}}>
                      {new Date(item[0].waktuPeriksa).toLocaleString()}
                    </Text>
                    <Text>Dokter: {dokter.nama}</Text>
                    <Text>Tempat: {dokter.tempatPraktek}</Text>
                    <Text>Keluhan : {item[0].keluhan}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
