import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import { Colors, Fonts } from '../themes'

export default class RedButton extends React.Component {
  render () {
    return <View style={this.props.disabled ? [ this.props.style, { opacity: 0.5 } ] : this.props.style}>
      <TouchableOpacity disabled={this.props.disabled} style={this.props.disabled ? [styles.button] : styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    </View>
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
