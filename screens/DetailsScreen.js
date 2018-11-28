import React from 'react';
import { View, StyleSheet, Text, Button, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

var parseString = require('react-native-xml2js').parseString;

export default class DetailsScreen extends React.Component {

  constructor(props){
    super(props);

    //Get params from navigator
    const { params } = this.props.navigation.state;

    //Set product barcode from params
    this.productBarCode = params ? params.productBarCode : null;

    this.state = {
      ingredients: [],
      isLoading: true,
    };

  }

  componentDidMount() {
    this.getProductInfo();
  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        { this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : ''}
        { this.state.ingredients.map((item, index) => {
          return <Text key={index}>{ item }</Text>
        })}
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }

  getProductInfo() {
    axios.get(`http://api.dabas.com/DABASService/V2/article/gtin/0${this.productBarCode}/XML?apikey=2e1ad76a-4627-46ae-97d1-0d300b4820d5`)
    .then(response => {
      var xml = response.data;
      let ingredients = parseString(xml, (err, result) => {
          var ingredients = result['Artikel']['Ingrediensforteckning'][0].split(', ');
          console.log(ingredients);
          if(ingredients) {
            this.setState({
              ingredients: ingredients,
              isLoading: false
            })
          } else {
            Alert.alert("The product couldn't be found");  
          }
      });
      console.log(this.state.ingredients);

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
