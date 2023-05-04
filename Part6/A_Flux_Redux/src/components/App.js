import React, { useEffect } from 'react'
import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './VisibilityFilter'
import { useDispatch } from 'react-redux'
import { initializeNotes } from '../reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Testing')
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
