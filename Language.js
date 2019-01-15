import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo'
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import Cache from './src/utils/cache'
const NORTH_AMERICA = ['US','CN','MY','IN','AE']

export default class Project extends Component {

  constructor(){
    super()
    this.state={
      cca2:'US',
      callingCode:null  
    }
  }

  async componentDidMount(){
    let userLocaleCountryCode = await Expo.DangerZone.Localization.getCurrentLocaleAsync()
    const userCountryData = getAllCountries()
    .filter(country => NORTH_AMERICA.includes(country.cca2))
    .filter(country => country.cca2 === userLocaleCountryCode)
    .pop()

    let {callingCode,cca2} = this.state

    callingCode = null
    cca2 = userLocaleCountryCode
    if (!cca2 || !userCountryData) {
      cca2 = 'US'
      callingCode = '1'
    } else {
      callingCode = userCountryData.callingCode
    }
    this.setState({cca2:this.state.cca2})
    this.setState({callingCode:this.state.callingCode})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        {<View style={{marginTop:-5}}>              
              <CountryPicker
                countryList={NORTH_AMERICA}
                onChange={value => {
                  Cache.locale = value.cca2
                  this.setState({ cca2: value.cca2, callingCode: value.callingCode })
                }}
                cca2={this.state.cca2}
                translation="eng"
              />
          </View>} 
        <Text style={styles.instructions}>
          {this.state.cca2}
        </Text>
        <Text style={{color:'red', fontWeight:'bold', fontSize:35,textAlign:'center'}}>{Cache.getLang('label.test')}</Text>
        <Text style={styles.instructions}>
          {this.state.callingCode}
        </Text>
      </View>
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