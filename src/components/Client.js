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
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl
} from 'react-native';

import Card from './uikit/Card';
import CardSection from './uikit/CardSection';

import Spinner from 'react-native-loading-spinner-overlay';

class Client extends Component {

  constructor(props) {
      super(props);
      this.state = {
        refreshing: false,
        clients : [],
        page : 1,
        isLoading : false,
      };
    }


  componentWillMount() {
      this.setState({isLoading: true});
      fetch('http://223.27.24.155/pazpo_crm_api/v1/getAllAgent')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ clients: responseJson.data });
          console.log(this.state.clients);
          this.setState({isLoading: false});
        })
        .catch((error) => {
          console.error(error);
        });
    }

  _onRefresh(page) {
    this.setState({isLoading: true});
    this.state.page = page + 1;
    fetch('http://223.27.24.155/pazpo_crm_api/v1/getAllAgent?pCurrentPage='+this.state.page)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ clients: this.state.clients.concat(responseJson.data) });
          this.setState({isLoading: false});

        })
        .catch((error) => {
          console.error(error);
        });
  }

  showSpinner (){
    return (
      <View >
        <Spinner visible={this.state.isLoading} textStyle={{color: '#FFF'}} />
      </View>
    );
  }

  _loadMore(){

    if (this.state.clients.length > 0 ){
    return (
      <View style={styles.containerLoadMore}>
        
          <TouchableOpacity style={styles.buttonLoadMore} onPress={() => this._onRefresh(this.state.page)}>
            <Text style={styles.textLoadMore}>Load More</Text>
          </TouchableOpacity>

      </View>

    );

    }

  }

render() {

  return (
    <ScrollView
    refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>

    {this.showSpinner()}

    <View style={styles.ContentList}>

    { this.state.clients.map((l,i) => { return <Card key={l.AgentID}>
        <CardSection>
              <View style = {styles.photoProfile}>
                <Image
                  style={styles.circle}
                  source={require('./img/profile.png')}
                />
              </View>
              <View style = {styles.profilName}>
                <Text style = {styles.nameText}>{l.firstname} </Text>
                <Text style = {styles.companyname} >Era - Depok </Text>
                <Text style={styles.postDate} >Posted 50 minute ago</Text>
              </View>

              <View style = {styles.HeaderContentStyle}>
                <View style = {styles.contentPrice}>
                  <Text>Harga</Text>
                  <Text style = {styles.price} > 5 M </Text>
                </View>

                <View style = {styles.contentPrice}>
                    <Text>Komisi</Text>
                    <Text style = {styles.comission} >30% </Text>
                </View>
              </View>
        </CardSection>

        <CardSection>
          <View style = {styles.contentNotes} >
            <Text>Dijual rumah fresh from the oven, cluster Purimas, Depok. Monggo di gangbang rame rame - 
              <Text style = {styles.lokasi}>
                Depok
              </Text>
            </Text>
          </View>
        </CardSection>

        <CardSection>
          <View style = {styles.contentFooter} >
              <TouchableOpacity style={styles.buttonMessage}>
                <Text style={styles.messageText}>Kirim Pesan</Text>
              </TouchableOpacity>
          </View>
        </CardSection>
      </Card>

    })}

    {this._loadMore()}
    </View>
    </ScrollView>

  );

}
}

const styles = StyleSheet.create({
  HeaderContentStyle : {
    flex : 1,
    justifyContent : 'space-around',
    flexDirection : 'row',
  },

  ContentList : {
    zIndex : 1,
  },

  profilName : {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight : 30
  },

  photoProfile : {
    padding : 10
  },

  nameText : {
    fontWeight: 'bold'
  },

  postDate : {
    fontSize : 7
  },

  companyname : {
    fontSize : 10
  },

  contentPrice : {
    flexDirection: 'column',
    justifyContent: 'center'
  },

  price : {
    fontSize : 15,
    fontWeight : 'bold'
  },

  comission : {
    fontSize : 15,
    justifyContent: 'center',
    marginLeft : 10
  },

  contentNotes : {
    padding : 3
  },

  lokasi : {
    padding : 1,
    fontWeight : 'bold'
  },

  contentFooter : {
    flex : 2,
    alignItems: 'flex-end'
  },

  buttonMessage : {
    width: 150,
    height: 40,
    backgroundColor : '#FFD43A',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  messageText : {
    color : 'white',
    textAlign: 'center',
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 100/2
  },

  containerLoadMore: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLoadMore: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textLoadMore: {
    color: '#8E8E8E',
  },
});

export default Client;

