import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
// Notes Services
import noteService from './services/notes'
import loginService from './services/login'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        notify(
          `Note '${note.content}' was already removed from server`,
          'alert'
        )

        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes((prev) => [...prev, returnedNote])
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      notify(`Welcome back ${user.name}`)
    } catch (exception) {
      notify('Wrong credentials', 'alert')
    }
  }

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification notification={notification} />

      {/* {user === null && loginForm()}
      {user !== null && noteForm()} */}

      {user === null ? (
        <Togglable buttonLabel="sign in">
          <LoginForm createLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note">
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
