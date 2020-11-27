import React, {useReducer, useState, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import {loadUser, saveUser} from './util/userStorage';
import {CommonActions} from '@react-navigation/native';
import {Text, Input, Button, Card} from 'react-native-elements';

export default function UpdateProfil({navigation}) {
  const [user, setUser] = useState({});
  const [tempTanggalLahir, settmpTanggalLahir] = useState(new Date());
  const [showCal, setShowCal] = useState(false);
  const [calChange, setCalChange] = useState(false);
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'ganti-nama':
          return {
            ...prevState,
            nama: action.newNama,
          };
        case 'ganti-tl':
          return {
            ...prevState,
            tanggalLahir: action.newTl,
          };
        case 'ganti-alamat':
          return {
            ...prevState,
            alamat: action.newAlamat,
          };
        case 'ganti-nomor':
          return {
            ...prevState,
            noTelp: action.newNoTelp,
          };
      }
    },
    {
      nama: user.nama,
      gmail: user.gmail,
      photoURL: user.photoURL,
      tanggalLahir: user.tanggalLahir || user.umur,
      alamat: user.alamat,
      noTelp: user.noTelp,
    },
  );

  let touchedProps = {
    style: calChange ? {color: 'black'} : {color: 'grey'},
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        loadUser().then((data) => {
          setUser(JSON.parse(data));
        });
      } catch (e) {
        console.log('fetch data error from home');
        console.log(e);
      }
    };
    fetchData();
  }, []);

  function onChange(event, selectedDate) {
    const currentDate = selectedDate || tempTanggalLahir;
    setShow(Platform.OS === 'ios');
    settmpTanggalLahir(currentDate);
    let newDate = new Date(currentDate.toDateString()).toISOString();
    dispatch({type: 'ganti-tl', newTl: newDate});
    setCalChange(true);
    setShowCal(false);
  }

  async function handleSubmit() {
    await firestore()
      .collection('pasien')
      .where('gmail', '==', user.gmail)
      .get()
      .then((querySnapshot) => {
        let id;
        querySnapshot.forEach((doc) => {
          id = doc.id;
          console.log(id);
        });
        console.log('id:', id);
        return id;
      })
      .then(async (id) => {
        await firestore()
          .doc(`pasien/${id}`)
          .update({
            nama: state.nama,
            alamat: state.alamat,
            noTelp: state.noTelp,
            tanggalLahir: state.tanggalLahir,
          })
          .then(() => {
            console.log('update berhasil');
          });
      })
      .then(() => {
        const updatedUser = {
          nama: state.nama,
          tanggalLahir: state.tanggalLahir,
          alamat: state.alamat,
          noTelp: state.noTelp,
        };
        saveUser({...user, ...updatedUser});
      });
    console.log('tes');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  }

  return (
    <View style={styles.form}>
      <Card>
        {/* <Text>Nama Lengkap:</Text> */}
        {/* {console.log(user.nama)} */}
        <Card.Title h4 style={{marginBottom: 40}}>
          Data Diri
        </Card.Title>
        <Input
          label="Nama Lengkap"
          placeholder="Nama Lengkap"
          defaultValue={user.nama}
          onChangeText={(text) =>
            dispatch({
              type: 'ganti-nama',
              newNama: text,
            })
          }
        />
        {/* <Text>Tanggal lahir:</Text>
        <View style={{margin: 10}}>
          <TouchableOpacity
            onPress={() => {
              setShowCal(true);
            }}>
            <Text {...touchedProps}>{tempTanggalLahir.toDateString()}</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Input
            label="Tanggal Lahir"
            placeholder="Tanggal Lahir"
            value={tempTanggalLahir.toDateString()}
            editable={false}
            containerStyle={{width: 180}}
          />

          <Button
            title="UBAH"
            buttonStyle={{backgroundColor: '#e00000'}}
            containerStyle={{width: 80, marginTop: 30, marginLeft: 20}}
            onPress={() => {
              setShowCal(true);
            }}
          />
        </View>
        {showCal && (
          <DateTimePicker
            mode="date"
            value={tempTanggalLahir}
            display="default"
            onChange={onChange}
            onTouchCancel={() => setShowCal(false)}
          />
        )}
        <Input
          label="Alamat"
          placeholder="Alamat"
          onChangeText={(text) => {
            dispatch({type: 'ganti-alamat', newAlamat: text});
          }}
        />
        <Input
          label="Nomor Telepon"
          placeholder="Nomor Telepon"
          keyboardType="phone-pad"
          onChangeText={(nomor) => {
            dispatch({type: 'ganti-nomor', newNoTelp: nomor});
          }}
        />
        <Button
          title="SUBMIT"
          buttonStyle={{backgroundColor: '#e00000'}}
          onPress={() => handleSubmit()}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
