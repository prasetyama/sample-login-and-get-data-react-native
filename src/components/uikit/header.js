import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Header extends Component {
    render() {
        return (
            <View style={styles.ViewStyle}>
                <Text style={styles.header}>PAZPO</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header : {
        fontSize : 15,
        textAlign : 'left',
        marginLeft : 20,
        marginBottom : 10
    },

    ViewStyle : {
        backgroundColor : '#FAF7EE',
        justifyContent : 'center',
        height : 50,
        paddingTop : 15,
        shadowColor : '#000',
        shadowOffset : { width : 0, height : 2},
        shadowOpacity : 0.2,
        elevation : 2,
        position : 'relative'
    }
});

export default Header;