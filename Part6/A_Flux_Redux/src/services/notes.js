import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const toggleImportanceOf = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const note = response.data
  const changedNote = { ...note, important: !note.important }
  const res = await axios.put(`${baseUrl}/${id}`, changedNote)
  return res.data
}

const notesServices = { getAll, createNew, toggleImportanceOf }

export default notesServices
