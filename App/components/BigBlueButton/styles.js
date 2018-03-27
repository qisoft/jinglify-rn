import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../theme'

export default StyleSheet.create({
  blueButton: {
    backgroundColor: Colors.brand,
    borderRadius: 6,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.title
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subtitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  subtitleNumber: {
    ...Fonts.style.bigBoldText,
    color: Colors.title
  },
  subtitleText: {
    ...Fonts.style.bigText,
    color: Colors.title,
    paddingLeft: 4
  },
  arrow: {

  }
})
