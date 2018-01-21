import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './styles'
import { Images } from '../../theme/index'

export default class StepperSetting extends React.Component {
  static get defaultProps () {
    return {
      value: 1,
      min: 1,
      max: 10
    }
  }

  increment () {
    if (this.props.value < this.props.max) {
      this.props.onChange(this.props.value + 1)
    }
  }

  decrement () {
    if (this.props.value > this.props.min) {
      this.props.onChange(this.props.value - 1)
    }
  }

  render () {
    let {
      title,
      value,
      subtitleText
    } = this.props

    return <View style={styles.container}>
      <View style={styles.settingContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleNumber}>{value}</Text>
            <Text style={styles.subtitleText}>{subtitleText}</Text>
          </View>
        </View>
        <View style={styles.stepperContainer}>
          <View style={styles.stepper}>
            <TouchableOpacity onPress={this.decrement.bind(this)} style={styles.stepperMinus}>
              <Image source={Images.minus} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.increment.bind(this)} style={styles.stepperPlus}>
              <Image source={Images.plus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  }
}
