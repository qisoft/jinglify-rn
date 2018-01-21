import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'

export default class RedButton extends React.Component {
  render () {
    return <View style={this.props.disabled ? [ this.props.style, { opacity: 0.5 } ] : this.props.style}>
      <TouchableOpacity disabled={this.props.disabled} style={this.props.disabled ? [styles.button] : styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    </View>
  }
}

