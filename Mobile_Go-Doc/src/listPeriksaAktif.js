import React, {useEffect, useReducer, useState} from 'react';
import {View, Text, Button, TouchableOpacity, Modal} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Card} from 'react-native-elements';

export default function ListPeriksaAktif({route, navigation}) {
  const db = firestore();
  const {dataUser} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
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
      }
    },
    {
      daftarPeriksa: [],
      userId: '',
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
              listPeriksa.push(doc.data());
            });
            dispatch({type: 'FETCH_PERIKSA', periksa: listPeriksa});
          });
      } catch (e) {
        console.error(e);
      }
    }
    fetchPeriksa();
    return () => {
      isSubscribed = false;
    };
  }, [state.userId]);

  return (
    <>
      <View>
        {console.log('uid:', state.userId)}
        {console.log('data:', state.daftarPeriksa)}
        <Text>List Periksa Aktif</Text>
      </View>

      <View>
        <Modal animationType='slide'>
          <View>
            <Card>
              <Card.Title>HELLO WORLD</Card.Title>
              <Text style={{marginBottom: 10}}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
          </View>
        </Modal>
      </View>

      <View>
        <Text></Text>
        {state.daftarPeriksa.map((item, key) => {
          let date = new Date(item.waktuPeriksa);
          console.log(date.toLocaleTimeString());
          return (
            <TouchableOpacity>
              <Button
                title={date.toDateString({dateStyle: 'full'})}
                key={key}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
