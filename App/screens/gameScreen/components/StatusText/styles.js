import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../../theme';

export default StyleSheet.create({
  statusContainer: {
    backgroundColor: Colors.greyBg,
    height: 100,
  },
  statusText: {
    ...Fonts.style.h1,
    color: Colors.title,
    textAlign: 'center'
  },
});
