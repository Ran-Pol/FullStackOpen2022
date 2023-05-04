import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import anecdotesService from '../services/anecdotes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    voteFor: (state, action) => {
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      noteToChange.votes += 1
    },
    setNotes(_, action) {
      return action.payload
    },
    appendNote: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { setNotes, appendNote } = noteSlice.actions

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdotesService.createNew(content)
    dispatch(appendNote(newNote))
    dispatch(setNotification({ message: `Created '${content}'`, timeout: 5 }))
  }
}

export const voteFor = (id) => {
  return async (dispatch) => {
    await anecdotesService.voteUpdate(id)
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
