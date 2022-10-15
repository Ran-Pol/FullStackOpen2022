import React from 'react'

const LoginForm = ({ handleOnChange, handleLogin, userLogin }) => {
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
