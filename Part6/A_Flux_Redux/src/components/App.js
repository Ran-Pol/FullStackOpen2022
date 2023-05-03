import React, { useEffect } from 'react'
import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './VisibilityFilter'
import noteService from '../services/notes'
import { setNotes } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("Inside useEffect")
    noteService.getAll().then((notes) => dispatch(setNotes(notes)))
  }, [dispatch])
console.log('klk')
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
