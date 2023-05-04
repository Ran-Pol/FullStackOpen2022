import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import anecdotesService from '../services/anecdotes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote: (state, action) => {
      state.push(action.payload)
    },
    voteFor: (state, action) => {
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      noteToChange.votes += 1
    },
    setNotes(_, action) {
      return action.payload
    },
  },
})

export const { setNotes } = noteSlice.actions

export const createNote = (content) => {
  return (dispatch) => {
    dispatch(noteSlice.actions.createNote(content))
    dispatch(setNotification({ message: `Created '${content}'`, timeout: 5 }))
  }
}

export const voteFor = (id) => {
  return (dispatch) => {
    dispatch(noteSlice.actions.voteFor(id))
    dispatch(setNotification({ message: `Voted for '${id}'`, timeout: 5 }))
  }
}

export const initializeNotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setNotes(anecdotes))
  }
}

export default noteSlice.reducer
