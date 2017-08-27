import { Text, Image, StyleSheet, View, TextInput, Button,
    TouchableHighlight, BackAndroid, Picker, ScrollView} from 'react-native';
import React, {Component} from 'react';

class ClientForm extends Component {

     constructor(props) {
        super(props);
        this.state = {
            nama: '',
            province: [],
            company: [],
            selectedProvince: '',
            selectedCompany: ''
        };
    }

    componentWillMount(){
        BackAndroid.addEventListener('hardwareBackPress', () => {
          if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
              this.props.navigator.pop();
              return true;
          }
          return false;
      });


        fetch('http://223.27.24.155/api_pazpo/v2/LoadAllCompanyArea')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ province: responseJson.province.data });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    apiCompany(pProvinceID){
      console.log('http://223.27.24.155/api_pazpo/v2/LoadAllCompany?pProvinceID='+pProvinceID);
      fetch('http://223.27.24.155/api_pazpo/v2/LoadAllCompany?pProvinceID='+pProvinceID)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ company: responseJson.company.data });
          console.log('Company has been loaded');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render(){
        return(

        <ScrollView >

            <View style={styles.container}>

                <Text style={styles.PropertyTypetext} >
                    Jenis Property
                </Text>

                <View style={styles.PropertyType} >

                    <View style = {styles.boxType} >
                        <Text style={styles.jualText}>
                            Jual
                        </Text>
                    </View>

                    <View style = {styles.boxType} >
                        <Text style={styles.jualText}>
                            Sewa
                        </Text>
                    </View>
                </View>

            <View style={styles.boxTypeIcon} >

                <View style={styles.typeIcon}>

                    <View style={styles.imageIcon}>

                        <TouchableHighlight >
                            <Image
                                style={styles.button}
                                source={require('./img/icHouse.png')}
                            />
                        </TouchableHighlight>
                        <Text>Rumah</Text>

                    </View>

                    <View style={styles.imageIcon}>

                        <TouchableHighlight >
                            <Image
                                style={styles.button}
                                source={require('./img/icOfficeInactive.png')}
                            />
                        </TouchableHighlight>
                        <Text>Kantor</Text>

                    </View>

                    <View style={styles.imageIcon}>

                        <TouchableHighlight >
                            <Image
                                style={styles.button}
                                source={require('./img/icWarehouseInactive.png')}
                            />
                        </TouchableHighlight>
                        <Text>Gudang</Text>

                    </View>
                </View>

                <View style={styles.typeIcon}>

                    <View style={styles.imageIcon}>

                        <TouchableHighlight >
                            <Image
                                style={styles.button}
                                source={require('./img/icShophouseInactive.png')}
                            />
                        </TouchableHighlight>
                        <Text>Rumah</Text>

                    </View>

                    <View style={styles.imageIcon}>

                        <TouchableHighlight >
                            <Image
                                style={styles.button}
                                source={require('./img/icShophouseInactive.png')}
                            />
                        </TouchableHighlight>
                        <Text>Ruko</Text>

                    </View>

                    <View style={styles.imageIcon}>

                        <TouchableHighlight >
                            <Image
                                style={styles.button}
                                source={require('./img/icLandInactive.png')}
                            />
                        </TouchableHighlight>
                        <Text>Tanah</Text>

                    </View>
                </View>

            </View>

            <View style={styles.form}>

                <Text style={styles.textCariProperti} >Lokasi Properti yang Dicari</Text>

                <View style={styles.cardborder} >

                    <Picker style={styles.picker}
                        selectedValue={this.state.selectedProvince}
                        mode="dropdown"
                        onValueChange={this.onValueChangeArea.bind(this, 'selectedProvince')}>

                        {this.state.province.map((l,i) => {return <Picker.Item value={l.ProvinceID} label={l.ProvinceName} key={l.ProvinceID}  /> })}
                    </Picker>

                </View>
            </View>

            <View style={styles.form} >
               <View style={styles.cardborder} >
                    <Picker style={styles.picker}
                        selectedValue={this.state.selectedCompany}
                        mode="dropdown"
                        onValueChange={this.onValueChangeCompany.bind(this, 'selectedCompany')}>
                        {this.state.company.map((l,i) => {return <Picker.Item value={l.CompanyID} label={l.CompanyName} key={l.CompanyID}  /> })}

                    </Picker>
                </View>
            </View>


            </View>

        </ScrollView>

        );
    }

 onValueChangeArea = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);

    this.apiCompany(value);

  };

  onValueChangeCompany = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#faf8ee',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  PropertyTypetext : {
      fontSize : 15,
      color : 'black',
      marginBottom : 15,
      marginTop : 25
  },

  textCariProperti : {
      fontSize : 15,
      color : 'black',
      textAlign : 'center',
      padding : 10
  },

  PropertyType : {
    flex : 1,
    justifyContent : 'space-around',
    flexDirection : 'row',
    width: 360
  },

  jualText : {
        color : 'black', // inactive color #ddd
        fontSize : 15,
        width : 135,
        padding : 13,
        marginLeft : 20,
        textAlign: 'center'
  },

  boxType : {
      width : 180,
      height : 50,
      backgroundColor : 'white',
      borderWidth : 1,
      borderColor : '#ddd'

  },

  boxTypeIcon : {
        borderWidth : 1,
        borderRadius : 2,
        borderColor : '#ddd',
        shadowColor : '#000',
        marginLeft : 5,
        marginRight : 5,
        width : 360,
        marginTop : 10

  },

  typeIcon : {
        padding : 10,
		backgroundColor : '#fff',
		justifyContent : 'space-around',
		flexDirection : 'row',
  },

  imageIcon : {
      marginLeft : 40,
      marginRight : 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding : 30
  },

  button : {
      width : 30,
      height : 30
  },

  form : {
    alignSelf: 'center',
    justifyContent : 'space-around',
    flexDirection : 'column',
    width: 380,
    padding : 10
  },

  cardborder : {
      paddingBottom : 20,
      paddingLeft : 18,
      paddingRight : 18,
      paddingTop : 20,
      backgroundColor : 'white'

  },
  picker : {
      height : 20
  }

});

export default ClientForm;
