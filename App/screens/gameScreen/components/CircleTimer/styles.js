import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../../theme';

export default StyleSheet.create({
  circleContainer: {
    width: 310,
    height: 310
  },
  circle: {
    backgroundColor: Colors.background,
    width: 290,
    height: 290,
    left: 12,
    top: 12,
    borderRadius: 145,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleProgress: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 161,
  },
  timer: {
    ...Fonts.style.timer,
    color: Colors.title
  },
  tapToPause: {
    ...Fonts.style.bigText,
    color: Colors.title
  },
})
