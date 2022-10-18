import React from 'react'
import './App.css'
import blogService from './services/blogsApi'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notificantion'
import NewBlog from './components/NewBlog'

function App() {
  const [blogs, setBlogs] = React.useState([])
  const [user, setUser] = React.useState(null)
  const [notification, setNotification] = React.useState(null)

  // useEffect to fetch all blog post data and setting to state variable
  React.useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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

  const listOfBlogs = blogs.map((blog) => <Blog key={blog.id} blog={blog} />)

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

  // Notification message
  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

   
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
          <NewBlog
            blogService={blogService}
            notify={notify}
            setBlogs={setBlogs}
          />
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
