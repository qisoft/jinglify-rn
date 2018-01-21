import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    gameSettings: require('./GameSettingsRedux').reducer,
    game: require('./GameRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}

