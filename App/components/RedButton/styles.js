import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../theme'

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.red,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },
  text: {
    color: Colors.white,
    ...Fonts.medium
  }
})
