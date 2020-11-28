import React, {useState, useEffect} from 'react';
import {View, Platform, Modal, Keyboard} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import {Button, Text, Input, Card, Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function JadwalPraktikDokter({route, navigation}) {
  const [tanggal, setTanggal] = useState(new Date());
  const tanggalMinimum = new Date();
  tanggalMinimum.setDate(tanggalMinimum.getDate() + 1);
  const [showCal, setShowCal] = useState(false);
  const [mode, setMode] = useState('date');
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
  }, [dataUser]);

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
        waktuPeriksa: tanggal.toISOString(),
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

  function gantiTanggal(event, date) {
    console.log('gantiTanggal');
    const tanggalPilihan = date || tanggal;
    setShowCal(Platform.OS === 'ios');
    setTanggal(tanggalPilihan);
    setShowCal(false);
  }

  function showMode(modePilihan) {
    console.log('log');
    setShowCal(true);
    setMode(modePilihan);
  }

  function pilihTanggal() {
    console.log('tanggal');
    Keyboard.dismiss();
    showMode('date');
  }

  function pilihJam() {
    console.log('jam');
    Keyboard.dismiss();
    showMode('time');
  }

  return (
    <View>
      <Card>
        <Card.Title h4 style={{marginBottom: 40}}>
          Buat Data Periksa
        </Card.Title>
        <Input
          label="Keluhan"
          placeholder="Masukkan keluhan"
          onChangeText={SetKeluhan}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Input
            label="Jam Periksa"
            placeholder="Jam Periksa"
            value={tanggal.toLocaleTimeString('short')}
            editable={false}
            containerStyle={{width: '60%'}}
          />

          <Button
            title="UBAH"
            buttonStyle={{backgroundColor: '#e00000'}}
            containerStyle={{width: '30%', marginTop: 30, marginLeft: 20}}
            onPress={() => {
              pilihJam();
            }}
          />
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Input
            label="Tanggal Periksa"
            placeholder="Tanggal Periksa"
            value={tanggal.toDateString()}
            editable={false}
            containerStyle={{width: '60%'}}
          />

          <Button
            title="UBAH"
            buttonStyle={{backgroundColor: '#e00000'}}
            containerStyle={{width: '30%', marginTop: 30, marginLeft: 20}}
            onPress={() => {
              pilihTanggal();
            }}
          />
        </View>
        {showCal && (
          <DateTimePicker
            minimumDate={tanggalMinimum}
            mode={mode}
            value={tanggal}
            onChange={gantiTanggal}
            onTouchCancel={() => setShowCal(false)}
            // onTouchOk={() => setShowCal(false)}
          />
        )}
        <Button
          title="SUBMIT"
          onPress={() => {
            buatPeriksa();
          }}
          buttonStyle={{backgroundColor: '#e00000'}}
        />
      </Card>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => handleModal()}>
        <View
          style={{
            paddingTop: 150,
            flex: 1,
            backgroundColor: 'rgba(100,100,100, 0.5)',
            alignItems: 'center',
          }}>
          <Card>
            <View
              style={{
                padding: 20,
              }}>
              <Icon
                size={150}
                type="material"
                color="#00BB4E"
                name="check-circle-outline"
              />
              <Text h4 h4Style={{alignSelf: 'center', marginTop: 10}}>
                Periksa Berhasil dibuat
              </Text>
              <Button
                buttonStyle={{backgroundColor: '#e00000', marginTop: 50}}
                title="KEMBALI"
                onPress={() => handleModal()}
              />
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
}
