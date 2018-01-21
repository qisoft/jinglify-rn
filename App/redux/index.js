import { combineReducers } from 'redux'
import configureStore from './createStore'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    gameSettings: require('../screens/getStartedScreen/redux').reducer,
    songs: require('../screens/songsScreen/redux').reducer,
    game: require('../screens/gameScreen/redux').reducer
  })

  return configureStore(rootReducer)
}

