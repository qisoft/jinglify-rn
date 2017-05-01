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
  },
  pauseScreen: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pauseBlur: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  pauseMenuContainer: {
    height: 368,
    width: 343,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 14,
    shadowOpacity: 0.5
  },
  pauseTitle: {
    ...Fonts.style.h1,
    backgroundColor: 'transparent',
    marginTop: 24,
    marginLeft: 20,
    marginBottom: 24
  },
  pauseThrowButton: {
    height: 203,
    backgroundColor: Colors.brand,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pauseThrowButtonText: {
    ...Fonts.style.hugeButton,
    color: Colors.white
  },
  pauseResumeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 22
  },
  pauseResumeButtonText: {
    ...Fonts.style.bigButton,
    color: Colors.brand
  }
})
