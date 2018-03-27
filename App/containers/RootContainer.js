import React, { Component } from 'react'
import { View } from 'react-native'
import NavigationRouter from '../navigation/NavigationRouter'
import PausableStatusBar from './PausableStatusBar';
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  render () {
    return (
      <View style={styles.applicationView}>
        <PausableStatusBar />
        <NavigationRouter />
      </View>
    )
  }
}

export default RootContainer
