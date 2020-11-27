import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button, Text, Card, ThemeProvider, Icon} from 'react-native-elements';

export default function Periksa({route, navigation}) {
  const {dataUser} = route.params;
  console.log('passedUser:', dataUser);

  let namaPanggilan = dataUser.nama.split(' ')[0];

  return (
    <ThemeProvider>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() =>
            navigation.navigate('BuatReservasi', {dataUser: dataUser})
          }>
          <Card>
            <Icon
              iconStyle={{marginTop: 20, marginBottom: 20}}
              size={120}
              type="material"
              color="#e00000"
              name="create"
            />
            <Card.Title style={{marginTop: 20, fontSize: 20}}>
              BUAT RESERVASI
            </Card.Title>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() =>
            navigation.navigate('ListPeriksaAktif', {dataUser: dataUser, diterima: false})
          }>
          <Card>
            <Icon
              iconStyle={{marginTop: 20, marginBottom: 20}}
              size={120}
              type="material"
              color="#e00000"
              name="assignment-turned-in"
            />
            <Card.Title style={{marginTop: 20, fontSize: 20}}>
              LIHAT RESERVASI AKTIF
            </Card.Title>
          </Card>
        </TouchableOpacity>
      </View>
    </ThemeProvider>
  );
}
