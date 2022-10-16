import React from 'react'

const NewBlog = ({ blogService, setErrorMessage, setBlogs }) => {
  const [newBlog, setNewBlog] = React.useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChangeBlog = (e) => {
    const { name, value } = e.target
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNewBlog = async () => {
    try {
      const newblog = await blogService.create(newBlog)
      setBlogs((prev) => [...prev, newblog])
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      console.log(exception.message)
      setErrorMessage('New blog was not created')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={newBlog.title}
          onChange={handleChangeBlog}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={newBlog.author}
          onChange={handleChangeBlog}
        />
      </div>
      <div>
        <label htmlFor="url">Url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={newBlog.url}
          onChange={handleChangeBlog}
        />
      </div>
      <button onClick={handleNewBlog}>Create</button>
    </div>
  )
}

export default NewBlog
