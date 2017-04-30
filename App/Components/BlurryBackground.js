import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'react-native-blur'

import styles from './Styles/BlurryBackgroundStyles'

export default class BlurryBackground extends React.Component {
  render () {
    return <View style={styles.container}>
      <View style={styles.blurredBackground}></View>
      <BlurView style={styles.blurView} blurType={"light"} blurAmount={10} />
      <View style={styles.contentContainer}>
        {this.props.children}
      </View>
    </View>
  }
}
