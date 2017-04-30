import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

function uniqBy (a, key) {
  let seen = new Set()
  return a.filter(item => {
    let k = key(item)
    return seen.has(k) ? false : seen.add(k)
  })
}

const { Types, Creators } = createActions({
  setMatchTime: ['matchTime'],
  setPeriodsCount: ['periodsCount'],
  addSongs: ['songs'],
  removeSong: ['song']
})

export const GameSettingsTypes = Types
export default Creators

/* --- Initial State --- */

export const INITIAL_STATE = Immutable({
  songs: [],
  songsCount: 0,
  matchTime: 5,
  periodsCount: 2
})

/* --- Reducers --- */

export const setMatchTime = (state, { matchTime }) => {
  return state.merge({matchTime: matchTime})
}

export const setPeriodsCount = (state, { periodsCount }) =>
  state.merge({ periodsCount: periodsCount })

export const addSongs = (state, { songs }) =>
  state.merge({
    songs: uniqBy([...state.songs, ...songs], x => `${x.artist}-${x.title}`),
    songsCount: state.songs.length + songs.length
  })

export const removeSong = (state, { song }) =>
  state.merge({ songs: state.songs.filter(x => `${x.artist}-${x.title}` !== `${song.artist}-${song.title}`), songsCount: state.songs.length - 1 })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MATCH_TIME]: setMatchTime,
  [Types.SET_PERIODS_COUNT]: setPeriodsCount,
  [Types.ADD_SONGS]: addSongs,
  [Types.REMOVE_SONG]: removeSong
})
