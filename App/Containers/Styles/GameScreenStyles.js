import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  gameContainer: {
    backgroundColor: Colors.greyBg,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleContainer: {
    width: 310,
    height: 310
  },
  circle: {
    backgroundColor: Colors.white,
    width: 290,
    height: 290,
    left: 10,
    top: 10,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleProgress: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  timer: {
    ...Fonts.style.timer
  },
  tapToPause: {
    ...Fonts.style.bigText
  },
  statusContainer: {
    backgroundColor: Colors.greyBg,
    height: 125,
    alignItems: 'center'
  },
  statusText: {
    ...Fonts.style.h1
  }
})
