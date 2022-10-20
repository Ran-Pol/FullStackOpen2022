import React from 'react'
import './App.css'
import blogService from './services/blogsApi'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notificantion'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = React.useState([])
  const [user, setUser] = React.useState(null)
  const [notification, setNotification] = React.useState(null)

  // useEffect to fetch all blog post data and setting to state variable
  React.useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(() => {
        return blogs.sort((blogOne, blogTwo) => blogTwo.likes - blogOne.likes)
      })
    )
  }, [])

  // Check if there is a user in the localstorage
  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const listOfBlogs = blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      updateBlog={() => updateBlog(blog.id, blog)}
    />
  ))

  const userLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser((prev) => !prev)
  }

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService(loginObject)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notify('Welcome back!')
    } catch (exception) {
      notify('Wrong credentials', 'alert')
    }
  }

  const addNewBlog = async (blogObjet) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newblog = await blogService.create(blogObjet)
      setBlogs((prev) => [...prev, newblog])

      notify(`A new blog: ${newblog.title} was added!`)
    } catch (exception) {
      notify(exception.message, 'alert')
    }
  }

  const updateBlog = async (id, blogObjet) => {
    try {
      const newblog = await blogService.update(id, blogObjet)
      setBlogs((prev) => {
        const filterList = prev.map((blog) =>
          blog.id !== newblog.id ? blog : newblog
        )
        return filterList.sort(
          (blogOne, blogTwo) => blogTwo.likes - blogOne.likes
        )
      })

      // notify(`Blog: ${newblog.title} was updated!`)
    } catch (exception) {
      notify(exception.message, 'alert')
    }
  }

  // Notification message
  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogFormRef = React.useRef()
  const blogForm = () => (
    <Togglable buttonLabel={'Create New Blog'} ref={blogFormRef}>
      <NewBlog createBlog={addNewBlog} />
    </Togglable>
  )

  return (
    <div>
      {user ? (
        <>
          <h1>Blogs</h1>
          <div>
            <h2>{user.name} logged in</h2>
            <button onClick={userLogOut}>Logout</button>
          </div>
          <Notification notification={notification} />
          {blogForm()}
          {listOfBlogs}
        </>
      ) : (
        <>
          <h2>Log in to aplication</h2>
          <Notification notification={notification} />
          <LoginForm createLogin={handleLogin} />
        </>
      )}
    </div>
  )
}

export default App
