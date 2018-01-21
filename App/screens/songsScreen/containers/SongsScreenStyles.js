import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../../theme/index'

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
  doneButton: {
    paddingTop: 10,
    paddingBottom: 10
  }
})
