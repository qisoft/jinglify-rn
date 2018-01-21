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
  addSongs: ['songs'],
  removeSong: ['song'],
  setEditingState: ['isEditing']
})

export const SongsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  songs: [],
  songsCount: 0,
  songsIsEditing: false
})

export const addSongs = (state, { songs }) =>
  state.merge({
    songs: uniqBy([...state.songs, ...songs], x => `${x.artist}-${x.title}`),
    songsCount: state.songs.length + songs.length
  })

export const removeSong = (state, { song }) => {
  let songs = state.songs.filter(x => `${x.artist}-${x.title}` !== `${song.artist}-${song.title}`)
  return state.merge({
    songs: songs,
    songsCount: state.songs.length - 1
  })
}

export const setEditingState = (state, { isEditing }) =>
  state.merge({
    songs: state.songs.map(x => ({
      ...x,
      isEditing: isEditing
    })),
    songsIsEditing: isEditing
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_SONGS]: addSongs,
  [Types.REMOVE_SONG]: removeSong,
  [Types.SET_EDITING_STATE]: setEditingState
})
