import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import { Colors, Fonts } from '../Themes';

export default class RedButton extends React.Component {
  render () {

    return <View style={this.props.style}>
      <TouchableOpacity disabled={this.props.disabled} style={styles.button} onPress={this.props.onPress}>
      <Text style={styles.text}>{this.props.title}</Text>
    </TouchableOpacity></View>
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.red,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },
  text: {
    color: Colors.white,
    ...Fonts.medium
  }
})
