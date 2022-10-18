import React from 'react'

const LoginForm = ({ createLogin }) => {
  const [userLogin, setUserLogin] = React.useState({
    username: '',
    password: '',
  })

  // The Form Handle Functions
  const handleChange = (event) => {
    const { name, value } = event.target

    setUserLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    createLogin(userLogin)
    setUserLogin({
      username: '',
      password: '',
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={userLogin.username}
          name="username"
          onChange={handleChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={userLogin.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
