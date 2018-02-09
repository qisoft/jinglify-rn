import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../theme'

export default StyleSheet.create({
  noSongsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greyBg,
    borderTopColor: Colors.separator,
    borderTopWidth: 1
  },
  noSongsTitle: {
    ...Fonts.style.songTitle
  },
  noSongsButton: {
    ...Fonts.style.bigButton,
    color: Colors.brand,
    marginTop: 16
  },
})
