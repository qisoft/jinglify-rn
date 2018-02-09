import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../../theme';

export default StyleSheet.create({
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
})