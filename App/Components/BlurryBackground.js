import React from 'react'
import { View, findNodeHandle, Image} from 'react-native'
import { BlurView } from 'react-native-blur'

import { Images } from '../Themes';

import styles from './Styles/BlurryBackgroundStyles'

export default class BlurryBackground extends React.Component {
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
      { this.state.viewRef !== null
        ? <BlurView viewRef={this.state.viewRef} blurRadius={10} style={styles.blurView} blurType={"light"} blurAmount={10}/>
        : undefined
      }
      <View style={styles.contentContainer}>
        {this.props.children}
      </View>
    </View>
  }
}
