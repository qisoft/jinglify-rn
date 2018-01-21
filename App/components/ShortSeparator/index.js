import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Colors } from '../themes'

export default class ShortSeparator extends React.Component {
  render () {
    return <View style={styles.line} />
  }
}

var styles = StyleSheet.create({
  line: {
    backgroundColor: Colors.shortSeparator,
    height: 1,
    marginLeft: 17,
    marginRight: 20
  }
})
