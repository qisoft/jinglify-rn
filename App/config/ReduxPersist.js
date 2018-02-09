import { seamlessImmutableReconciler, seamlessImmutableTransformer } from 'redux-persist-seamless-immutable'
import { AsyncStorage } from 'react-native'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '5',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    blacklist: ['login', 'search'], // reducer keys that you do NOT want stored to persistence here
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [seamlessImmutableTransformer],
    stateReconciler: seamlessImmutableReconciler,
  }
}

export default REDUX_PERSIST
