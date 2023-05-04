import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    const newNote = await anecdoteServices.createNew(content)
    console.log('newNote in anecdoteForm', newNote)
    dispatch(createNote(newNote))
    event.target.note.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewNote}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
