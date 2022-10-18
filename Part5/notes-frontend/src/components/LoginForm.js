import React from 'react'

const LoginForm = ({ handleLogin, userLogin, handleChange }) => {
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
