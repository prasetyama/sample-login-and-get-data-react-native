/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackAndroid
} from 'react-native';

import RNAccountKit from 'react-native-facebook-account-kit'

class Login extends Component {

  getPhoneNumber = (token) => {
    fetch('https://graph.accountkit.com/v1.1/me/?access_token='+token)
      .then((response) => response.json())
      .then((responseJson) => {
        this.checkPhoneNumber('0'+responseJson.phone.national_number);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  checkPhoneNumber(phoneNumber) {
    fetch('http://223.27.24.155/api_pazpo/v2/LoginProcess?pMobilePhone='+phoneNumber)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert('LOGIN SUKSES LANJUT KE HOME');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount(){
      RNAccountKit.configure({})
      
      BackAndroid.addEventListener('hardwareBackPress', () => {
        console.log(this.props.navigator.getCurrentRoutes().length);
          if (this.props.navigator.getCurrentRoutes().length > 1) {
              this.props.navigator.pop();
              return true;
          }

          return false;
      });
  }

  render() {
    return (
      RNAccountKit.loginWithPhone()
      .then((token) => {
        if (!token) {
          Alert.alert('User membatalkan login.');
        } else {
          this.getPhoneNumber(token.token)
        }
      })
      .catch((e) => {
        if (e.code != 'cancel') {
        Alert.alert('Login gagal! Silahkan coba kembali.')
        }
        console.log('Failed to login', e)
      })
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login;

