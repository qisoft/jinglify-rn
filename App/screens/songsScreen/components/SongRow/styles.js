import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../theme'

export default StyleSheet.create({
  listRow: {
    backgroundColor: Colors.white,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    flex: 1
  },
  songTitleContainer: {
    paddingLeft: 9,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  songArtwork: {
    width: 60,
    height: 60,
    borderRadius: 6
  },
  songArtist: {
    ...Fonts.style.songSubtitle,
    color: Colors.muted
  },
  songTitle: {
    ...Fonts.style.songTitle,
    color: Colors.text,
    height: 20
  },
  songDelete: {
    width: 24,
    height: 27,
    marginTop: 19,
    marginRight: 8
  }
})
