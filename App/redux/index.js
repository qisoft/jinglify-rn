import { persistCombineReducers } from 'redux-persist'
import config from '../config/ReduxPersist';
import configureStore from './createStore'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = persistCombineReducers(config.storeConfig, {
    gameSettings: require('../screens/getStartedScreen/redux').reducer,
    songs: require('../screens/songsScreen/redux').reducer,
    game: require('../screens/gameScreen/redux').reducer
  })

  return configureStore(rootReducer)
}

