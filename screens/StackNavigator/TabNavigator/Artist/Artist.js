import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Artist extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>Favorites</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});
