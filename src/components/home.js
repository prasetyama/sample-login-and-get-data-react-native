import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  ToolbarAndroid
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
import Chat from './Chat';
import Client from './Client';
import Header from './uikit/header';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class Home extends Component {

  clientForm(id, message) {
        this.props.navigator.push({
        id: id,
        passProps: {
            message: message,
            goBack: this.goBack,
        }
        })
    }

  render() {
    return (
    	<View style={styles.container}>

      <ToolbarAndroid style={styles.toolbar}
           title="Pazpo"
           titleColor={'#000000'}
      />

	      <ScrollableTabView
          	tabBarUnderlineStyle={{backgroundColor:'#FFD43A' , borderColor : '#FAF7EE' , borderBottomWidth : 0.1 , borderBottomColor : '#FAF7EE'}}
            tabBarActiveTextColor={'#FFD43A'}
            tabBarBackgroundColor={'#FAF7EE'}>
	        <Chat tabLabel="Chat"/>
	        <Client tabLabel="Client" />
	      </ScrollableTabView>

        <ActionButton
          style={styles.floatingButton}
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { this.clientForm('clientForm', 'client form')}}
        />
	    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },

    floatingButton : {
      zIndex : 9999
    },

    toolbar: {
      backgroundColor: '#e9eaed',
      height: 56,
    },
});

export default Home;
