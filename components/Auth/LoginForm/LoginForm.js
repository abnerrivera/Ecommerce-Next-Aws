import React from 'react'

const LoginForm = ({ ShowRegisterForm }) => {
  return (
    <>
      <div>LoginForm</div>
      <button onClick={ShowRegisterForm}>REGISTRARSE</button>
    </>
  )
}

export default LoginForm