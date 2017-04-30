import { StyleSheet } from 'react-native'

import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    height: 116,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 28,
    paddingBottom: 28
  },
  settingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1
  },
  subtitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  stepperContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  stepper: {
    width: 93,
    flexDirection: 'row'
  },
  stepperMinus: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.brand,
    borderTopWidth: 1,
    borderTopColor: Colors.brand,
    borderBottomWidth: 1,
    borderBottomColor: Colors.brand,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderRightColor: Colors.brand,
    borderRightWidth: 0.5
  },
  stepperPlus: {
    borderLeftWidth: 0.5,
    borderLeftColor: Colors.brand,
    borderTopWidth: 1,
    borderTopColor: Colors.brand,
    borderBottomWidth: 1,
    borderBottomColor: Colors.brand,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderRightWidth: 1,
    borderRightColor: Colors.brand
  },
  title: {
    ...Fonts.style.h4,
    color: Colors.title
  },
  subtitleNumber: {
    ...Fonts.style.textBold
  },
  subtitleText: {
    ...Fonts.style.text,
    paddingLeft: 4
  }
})
