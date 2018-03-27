import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../../theme';

export default StyleSheet.create({
  songTitleContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    backgroundColor: Colors.greyBg,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20
  },
  songTitle: {
    ...Fonts.style.songTitle,
    color: Colors.title
  },
});
