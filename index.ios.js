import './App/config/ReactotronConfig'
import { AppRegistry, DeviceEventEmitter } from 'react-native'
import App from './App/containers/App'
import { Actions as NavigationActions } from 'react-native-router-flux'
import QuickActions from 'react-native-quick-actions'

AppRegistry.registerComponent('Jinglify', () => App)
const handleShortcut = (data) => {
  if (data && data.type === 'se.fastdev.jinglify.startnewmatch') {
    NavigationActions.game()
  }
}

DeviceEventEmitter.addListener('quickActionShortcut', handleShortcut)

QuickActions.popInitialAction().then(handleShortcut).catch(console.error)
