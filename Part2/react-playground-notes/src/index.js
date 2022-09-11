import React from 'react'
import ReactDOM from 'react-dom/client'
import {notes} from './data/notes'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)