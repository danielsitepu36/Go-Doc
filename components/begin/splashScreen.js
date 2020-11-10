import React, {Component, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SvgUri} from 'react-native-svg-uri';
import Logo from '../../resource/logo.svg';

class SplashScreen extends Component {
  // async componentDidMount() {
  //     const data = await this.performTimeConsumingTask();

  //        if (data !== null) {
  //       // alert('Moved to next Screen here');
  //    this.props.navigator.push({
  //        screen:"Project1.AuthScreen"})
  //        }
  //  }
  //  performTimeConsumingTask = async() => {
  //    return new Promise((resolve) =>
  //      setTimeout(
  //        () => { resolve('result') },
  //        3000
  //      )
  //    );
  //  }

  render() {
    return (
      <>
        <View style={styles.logo}>
          <Logo />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
