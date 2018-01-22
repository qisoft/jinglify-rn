import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../../theme'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  gameContainer: {
    backgroundColor: Colors.greyBg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
