import { Platform } from 'react-native'
import Fonts from './fonts'
import Metrics from './metrics'
import Colors from './colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: Platform.select({
        ios: Metrics.baseMargin * 4,
        android: Metrics.baseMargin * 4 - 25
      }),
      backgroundColor: Colors.transparent
    },
    header: {
      paddingBottom: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    section: {
      marginLeft: Metrics.section,
      marginRight: Metrics.section
    },
    titleText: {
      ...Fonts.style.h1,
      color: Colors.title
    },
    button: {
      color: Colors.brand,
      ...Fonts.style.button
    },
    buttonRed: {
      color: Colors.red,
      paddingTop: 10,
      paddingBottom: 10,
      ...Fonts.style.button
    }
  }
}

export default ApplicationStyles
