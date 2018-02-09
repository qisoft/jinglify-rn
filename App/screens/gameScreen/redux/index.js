import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  setMatchTimeLeft: ['matchTimeLeft'],
  setCurrentPeriod: ['currentPeriod'],
  setTotalMatchTime: ['totalMatchTime'],
  setStatus: ['status'],
  setPaused: ['isPaused'],
  setCurrentGame: ['game'],
})

export const GameTypes = Types
export default Creators

/* --- Initial State --- */

export const INITIAL_STATE = Immutable({
  matchTimeLeft: 0,
  currentPeriod: 1,
  totalMatchTime: 0,
  status: '',
  isPaused: false,
  currentGame: null,
})

/* --- Reducers --- */

export const setMatchTimeLeft = (state, { matchTimeLeft }) =>
  state.merge({ matchTimeLeft: matchTimeLeft })

export const setCurrentPeriod = (state, { currentPeriod }) =>
  state.merge({ currentPeriod: currentPeriod })

export const setTotalMatchTime = (state, { totalMatchTime }) =>
  state.merge({ totalMatchTime: totalMatchTime })

export const setStatus = (state, { status }) =>
  state.merge({ status: status })

export const setPaused = (state, { isPaused }) =>
  state.merge({ isPaused: isPaused })


export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MATCH_TIME_LEFT]: setMatchTimeLeft,
  [Types.SET_CURRENT_PERIOD]: setCurrentPeriod,
  [Types.SET_TOTAL_MATCH_TIME]: setTotalMatchTime,
  [Types.SET_STATUS]: setStatus,
  [Types.SET_PAUSED]: setPaused,
  [Types.SET_CURRENT_GAME]: (s, { game }) => s.merge({ currentGame: game }),
})
