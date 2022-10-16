import React from 'react'
import blogService from './services/blogsApi'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notificantion'

function App() {
  const [blogs, setBlogs] = React.useState([])
  const [user, setUser] = React.useState(null)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [userLogin, setUserLogin] = React.useState({
    username: '',
    password: '',
  })

  // useEffect to fetch all blog post data and setting to state variable
  React.useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Check if there is a user in the localstorage
  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const listOfBlogs = blogs.map((blog) => <Blog key={blog.id} blog={blog} />)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUserLogin((prev) => ({ ...prev, [name]: value }))
  }
  const userLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser((prev) => !prev)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService(userLogin)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUserLogin({
        username: '',
        password: '',
      })
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
          {listOfBlogs}
        </>
      ) : (
        <>
          <h2>Log in to aplication</h2>
          <Notification message={errorMessage} />
          <LoginForm
            handleLogin={handleLogin}
            handleOnChange={handleOnChange}
            userLogin={userLogin}
          />
        </>
      )}
    </div>
  )
}

export default App
