import ReduxPersist from '../config/ReduxPersist'
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import songsAction from '../screens/songsScreen/redux'
import gameActions from '../screens/gameScreen/redux'

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig
  const startup = () => {
    store.dispatch(songsAction.setEditingState(false))
    store.dispatch(gameActions.setPaused(false))
  }

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      console.tron.display({
        name: 'PURGE',
        value: {
          'Old Version:': localVersion,
          'New Version:': reducerVersion
        },
        preview: 'Reducer Version Change Detected',
        important: true
      })

      // migrate from v.4 to v.5 store
      if (localVersion === '4' && reducerVersion === '5') {
        const { gameSetting } = store.getState();
        store.dispatch(songsAction.addSongs(gameSetting.songs));
      }
      // Purge store
      persistStore(store, config, startup).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, config, startup)
    }
  }).catch(() => {
    persistStore(store, config, startup)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default {updateReducers}
