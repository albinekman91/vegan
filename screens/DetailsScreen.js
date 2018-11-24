import React from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import axios from 'axios';

export default class DetailsScreen extends React.Component {

  constructor(props){
    super(props);

    //Get params from navigator
    const { params } = this.props.navigation.state;

    //Set product barcode from params
    this.productBarCode = params ? params.productBarCode : null;

    console.log(this.productBarCode);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>From navigation: 0{ this.productBarCode }</Text>
        <Button
          onPress={this._getProductInfo}
          title={`Sök: 0${this.productBarCode}`}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }

  _getProductInfo = () => {
    // var parseString = require('react-native-xml2js').parseString;
    axios.get(`http://api.dabas.com/DABASService/V2/article/gtin/0${this.productBarCode }/XML?apikey=2e1ad76a-4627-46ae-97d1-0d300b4820d5`)
    .then(function (response) {
      var parseString = require('react-native-xml2js').parseString;
      var xml = response.data;
      parseString(xml, function (err, result) {
          console.log(result['Artikel']['Ingrediensforteckning']);
          var ingredients = JSON.stringify(result['Artikel']['Ingrediensforteckning']);
          if(ingredients) {
            Alert.alert(ingredients);
          } else {
            Alert.alert("The product couldn't be found");  
          }
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
