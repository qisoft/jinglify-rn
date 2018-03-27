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
    justifyContent: 'flex-end',
    alignItems: 'stretch'
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
    maxHeight: 358,
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 20,
    shadowColor: '#000000',
    margin: 20,
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
    backgroundColor: Colors.greyBg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: Colors.background,
  },
  pauseThrowButtonText: {
    ...Fonts.style.hugeButton,
    textAlign: 'center',
    color: Colors.brand
  },
  pauseResumeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.greyBg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  pauseResumeButtonText: {
    ...Fonts.style.button,
    color: Colors.brand
  },
})
