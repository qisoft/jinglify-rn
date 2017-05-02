import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  list: {
    marginTop: 16,
    flex: 1
  },
  listSectionHeader: {
    paddingTop: 26,
    paddingLeft: 16,
    paddingBottom: 8,
    backgroundColor: Colors.greyBg,
    borderTopColor: Colors.separator,
    borderTopWidth: 1,
    borderBottomColor: Colors.separator,
    borderBottomWidth: 1
  },
  listSectionHeaderText: {
    ...Fonts.style.h2
  },
  listRow: {
    backgroundColor: Colors.white,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    flex: 1
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.shortSeparator,
    width: '100%'
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
  },
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
  addMoreSongs: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  doneButton: {
    paddingTop: 10,
    paddingBottom: 10
  }
})
