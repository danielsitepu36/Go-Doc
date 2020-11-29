import React, {useReducer, useEffect} from 'react';
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Text, Card, ThemeProvider} from 'react-native-elements';

import {loadUser} from './util/userStorage';

export default function ReminderObat({route, navigation}) {
  const {dataUser} = route.params;
  const db = firestore();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_REMINDER':
          const reminder = action.reminders;
          console.log('fungsi fetch reminder, reminder:', reminder)
          return {
            ...prevState,
            reminder: reminder,
          };
        case 'FETCH_UID':
          return {
            ...prevState,
            uid: action.id,
          };
      }
    },
    {
      uid: '',
      reminder: [],
    },
  );

  useEffect(() => {
    let isSubscribed = true;
    const fetchID = async () => {
      let UID;
      try {
        await db
          .collection('pasien')
          .where('gmail', '==', dataUser.gmail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((item) => {
              console.log('id', item.id);
              UID = item.id;
              dispatch({type: 'FETCH_UID', id: UID});
            });
          });
      } catch (e) {
        console.error(e);
      }
    };
    fetchID();
    return () => (isSubscribed = false);
  }, [dataUser]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchReminder = async () => {
      let listReminder = [];
      try {
        if (isSubscribed) {
          console.log('uid', state.uid);
          await db
            .collection('reminderObat')
            .where('idPasien', '==', state.uid)
            .get()
            .then((querySnapshot) => {
              console.log('data_collection', querySnapshot);
              querySnapshot.forEach((doc) => {
                console.log('doc.id', doc.id);
                console.log('doc.data', doc.data())
                listReminder.push([doc.data(), doc.id]);
              });
              dispatch({
                type: 'FETCH_REMINDER',
                reminders: listReminder,
              });
            });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchReminder();
    return function cleanUp() {
      isSubscribed = false;
    };
  }, [state.uid]);

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
            <Text
              style={{fontSize: 28, alignSelf: 'center', fontWeight: 'bold'}}>
              Daftar Dokter
            </Text>
            <Text></Text>
            <Text style={{fontSize: 18, marginLeft: 20}}>
              Daftar pengingat obat yang aktif:
            </Text>
          </View>

          {console.log('render list reminder', state.reminder)}
          <View style={{maxHeight: '85%'}}>
            <FlatList
              data={state.reminder}
              keyExtractor={(item) => item[1]}
              renderItem={({item}) => {
                let reminder = item[0];
                console.log('reminder', reminder)
                return (
                  <TouchableOpacity>
                    <Card containerStyle={{}}>
                      <View>
                        <View style={{margin: 10}}>
                          <Text h4 h4Style={{fontSize: 14}}>
                            Obat: {reminder.namaObat}
                          </Text>
                          <Text>Jadwal minum: {reminder.jadwal}</Text>
                          {/* <Text>Alamat Praktek: {item[0].tempatPraktek}</Text> */}
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ThemeProvider>
    </>
  );
}
