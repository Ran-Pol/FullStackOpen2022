import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload)
  } else if (action.type === 'TOGGLE_IMPORTANCE') {
    const id = action.payload.id
    const noteToChange = state.find((n) => n.id === id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important,
    }
    return state.map((note) => (note.id !== id ? note : changedNote))
  }

  return state
}

const store = createStore(noteReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)
