import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  redButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    padding: 28
  },
  redButton: {
    height: 48
  }
})
