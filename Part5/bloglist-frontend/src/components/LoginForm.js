import React from 'react'

const LoginForm = ({ createLogin }) => {
  const [userLogin, setUserLogin] = React.useState({
    username: '',
    password: '',
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUserLogin((prev) => ({ ...prev, [name]: value }))
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
          onChange={handleOnChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={userLogin.password}
          name="password"
          onChange={handleOnChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
