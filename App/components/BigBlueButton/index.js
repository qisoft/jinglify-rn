import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import styles from './styles'
import { Images } from '../../theme'
export default class BigBlueButton extends React.Component {
  render () {
    return <TouchableOpacity style={styles.blueButton} onPress={this.props.onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleNumber}>{this.props.subtitleNumber}</Text>
          <Text style={styles.subtitleText}>{this.props.subtitleText}</Text>
        </View>
      </View>
      <Image source={Images.next} />
    </TouchableOpacity>
  }
}
