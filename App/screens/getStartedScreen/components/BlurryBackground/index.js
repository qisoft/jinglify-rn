import React from 'react'
import { View, findNodeHandle, Image } from 'react-native'

import { Images } from '../../../../theme/index'
import styles from './styles'

export class BlurryBackground extends React.Component {
  constructor (props) {
    super(props)
    this.state = { viewRef: null }
  }

  setRef (element) {
    if (this.state.viewRef === null) {
      let viewRef = findNodeHandle(element)
      this.setState({ viewRef: viewRef })
    }
  }
  render () {
    return <View style={styles.container}>
      <View style={styles.blurredBackground}>
        <Image source={Images.shadow} />
      </View>
      <View style={styles.contentContainer}>
        {this.props.children}
      </View>
    </View>
  }
}
