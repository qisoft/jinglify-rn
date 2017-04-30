import { StyleSheet } from 'react-native'

import { Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 133
  },
  blurredBackground: {
    backgroundColor: Colors.blurredBackground,
    top: 20,
    bottom: 0,
    left: 20,
    right: 24,
    position: 'absolute'
  },
  blurView: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  contentContainer: {
    paddingBottom: 26,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1
  }
})
