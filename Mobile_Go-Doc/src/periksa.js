import React, {useState} from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default function Periksa({route, navigation}) {
  const {dataUser} = route.params;
  console.log('passedUser:', dataUser)

  let user;
  if (dataUser) {
      user = dataUser;
  }
  let namaPanggilan = user.nama.split(' ');
  namaPanggilan = namaPanggilan[0];

  return (
    <View>
        <Text>{namaPanggilan}, mau periksa apa hari ini?</Text>
      <TouchableOpacity>
        <Button title="Lihat Reservasi Aktif" onPress={() => navigation.navigate('ListPeriksaAktif')}/>
        <Button title="Buat Reservasi" />
      </TouchableOpacity>
    </View>
  );
}
