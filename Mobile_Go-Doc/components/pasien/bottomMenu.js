import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class BottomMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Bottom Menu</Text>
      </View>
    );
  }
}

export default BottomMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    bottom: 0,
  },
});
