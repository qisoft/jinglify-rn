import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../../theme';

export default StyleSheet.create({
  statusContainer: {
    backgroundColor: Colors.greyBg,
    height: 75,
    alignItems: 'center'
  },
  statusText: {
    ...Fonts.style.h1,
    color: Colors.title
  },
});