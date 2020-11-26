import React, {useState, useEffect} from 'react';
import {View, Text, Button, Platform, TextInput, Modal} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
// import {loadUser} from './util/userStorage';
// import DatePicker from 'react-native-date-picker';

export default function JadwalPraktikDokter({route, navigation}) {
  // const [date, setDate] = useState(new Date());
  const [userId, setUID] = useState('');
  const [keluhanPasien, SetKeluhan] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {dokter, dataUser} = route.params;
  const db = firestore();

  useEffect(() => {
    const fetchData = async () => {
      console.log('email: ', dataUser.gmail);
      try {
        db.collection('pasien')
          .where('gmail', '==', dataUser.gmail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setUID(doc.id);
            });
          });
      } catch (e) {
        console.log(e);
      }
      console.log('UID:', userId, '=> gmail: ', dataUser.gmail);
    };
    fetchData();
  }, []);

  // function pilihTanggal(date, days) {
  //   let tanggal = new Date();
  //   tanggal.setDate(tanggal.getDate() + days);
  //   return tanggal;
  // }

  async function buatPeriksa() {
    console.log('keluhan: ', keluhanPasien);
    if (keluhanPasien == '') {
      alert('Keluhan masih kosong!');
      return;
    }
    await db
      .collection('periksa')
      .add({
        diterima: 'menunggu',
        idDokter: dokter[1],
        idPasien: userId,
        keluhan: keluhanPasien,
        rekamMedis: {},
        waktuPeriksa: new Date().toISOString(),
      })
      .then(() => {
        // alert('Periksa berhasil dibuat');
        setModalVisible(true);
        // navigation.goBack();
      });
  }

  function handleModal() {
    setModalVisible(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Home'},
          // {name: 'JadwalPraktikDokter'}
        ],
      }),
    );
  }

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => handleModal()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'grey',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: '#fff',
              borderRadius: 10,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 200,
              padding: 20,
            }}>
            <Text style={{flex: 1, height: 20, margin: 50, textAlignVertical: 'center'}}>Periksa berhasil dibuat!</Text>
            <View style={{backgroundColor: 'grey', height: 1, width: '100%'}}></View>
            <View style={{flex: 1}}></View>
            <Button title="Kembali ke Home" onPress={() => handleModal()} />
          </View>
        </View>
      </Modal>
      <Text style={{fontSize: 28, fontWeight: 'bold', alignSelf: 'center'}}>
        Jadwal Praktik
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center',
          paddingBottom: 20,
        }}>
        dr. {dokter[0].nama}
      </Text>
      <View>
        <TextInput placeholder="Masukkan keluhan" onChangeText={SetKeluhan} />
        <Button
          title="Buat Permintaan Periksa"
          onPress={() => {
            buatPeriksa();
          }}
        />
      </View>
    </View>
  );
}
