import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../../theme'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  songTitleContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    backgroundColor: Colors.greyBg,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20
  },
  songTitle: {
    ...Fonts.style.songTitle
  },
  gameContainer: {
    backgroundColor: Colors.greyBg,
    flex: 1,
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
    ...Fonts.style.timer,
    color: Colors.title
  },
  tapToPause: {
    ...Fonts.style.bigText,
    color: Colors.title
  },
  statusContainer: {
    backgroundColor: Colors.greyBg,
    height: 75,
    alignItems: 'center'
  },
  statusText: {
    ...Fonts.style.h1,
    color: Colors.title
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
    color: Colors.title,
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
  },
  blurredBackground: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
