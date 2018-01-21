import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  setMatchTime: ['matchTime'],
  setPeriodsCount: ['periodsCount']
})

export const GetStartedTypes = Types
export default Creators

/* --- Initial State --- */

export const INITIAL_STATE = Immutable({
  matchTime: 5,
  periodsCount: 2
})

/* --- Reducers --- */

export const setMatchTime = (state, { matchTime }) => {
  return state.merge({matchTime: matchTime})
}

export const setPeriodsCount = (state, { periodsCount }) =>
  state.merge({ periodsCount: periodsCount })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MATCH_TIME]: setMatchTime,
  [Types.SET_PERIODS_COUNT]: setPeriodsCount
})
