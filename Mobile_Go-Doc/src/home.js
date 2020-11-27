import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {webClientId} from './util/config';
import {loadUser} from './util/userStorage';
import {CommonActions} from '@react-navigation/native';
import {Text, Card, ThemeProvider, Icon} from 'react-native-elements';

const GodocArt = require('../resource/GodocArt.png');

GoogleSignin.configure({
  webClientId: webClientId,
});

export default function Home({route, navigation}) {
  const [user, setUser] = useState({});

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

  if (user.tanggalLahir === '') {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'UpdateProfil'}],
      }),
    );
  }

  return (
    <>
      <ThemeProvider>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <Card>
            <Card.Title style={{textAlign: 'left'}}>
              <Text h4 h4Style={{fontSize: 18}}>
                Selamat datang, {user.nama}
              </Text>
            </Card.Title>
            <Card.Divider />
            <Text>Jadwal minum obat selanjutnya: -</Text>
          </Card>
        </View>
        <TouchableOpacity
          style={{marginLeft: 10, marginRight: 10}}
          onPress={() => navigation.navigate('Periksa', {dataUser: user})}>
          <Card>
            <Image
              source={GodocArt}
              resizeMode="contain"
              style={{alignSelf: 'center', width: 300, height: 200}}
            />
            <Card.Title style={{marginTop: 20}}>PERIKSA</Card.Title>
          </Card>
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{width: '50%'}}>
            <Card>
              <Icon
                size={40}
                type="material-community"
                color="#e00000"
                name="pill"
              />
              <Card.Title style={{marginTop: 20}}>REMINDER OBAT</Card.Title>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ListPeriksaAktif', {
                dataUser: user,
                diterima: true,
              })
            }
            style={{width: '50%'}}>
            <Card>
              <Icon
                size={40}
                type="material"
                color="#e00000"
                name="folder-shared"
              />
              <Card.Title style={{marginTop: 20}}>RIWAYAT</Card.Title>
            </Card>
          </TouchableOpacity>
        </View>
      </ThemeProvider>
    </>
  );
}
