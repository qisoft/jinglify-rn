import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../../theme';

export default StyleSheet.create({
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
})