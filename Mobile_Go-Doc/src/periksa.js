import React, {useState} from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default function Periksa({route, navigation}) {
  const {dataUser} = route.params;
  console.log('passedUser:', dataUser)

  // let user;
  // if (dataUser) {
  //     user = dataUser;
  // }
  let namaPanggilan = dataUser.nama.split(' ')[0];

  return (
    <View>
        <Text>Halo {namaPanggilan}, mau periksa apa hari ini?</Text>
      <TouchableOpacity>
        <Button title="Lihat Daftar Periksa" onPress={() => navigation.navigate('ListPeriksaAktif', {dataUser: dataUser})}/>
        <Button title="Buat Reservasi" onPress={() => navigation.navigate('BuatReservasi', {dataUser: dataUser})}/>
      </TouchableOpacity>
    </View>
  );
}
