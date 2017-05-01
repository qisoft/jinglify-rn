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
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightColor: Colors.brand,
    borderRightWidth: 0.5
  },
  stepperPlus: {
    borderWidth: 1,
    borderLeftWidth: 0.5,
    backgroundColor: Colors.white,
    borderColor: Colors.brand,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
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
