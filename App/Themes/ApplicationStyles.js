import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

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
      paddingTop: Metrics.baseMargin * 4,
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
      ...Fonts.style.button
    }
  }
}

export default ApplicationStyles
