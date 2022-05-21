import React from 'react'
import {useState} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Auth = ({onCloseModal, setTitleModal}) => {

  const [showLogin, setShowLogin] = useState(true)


  const ShowLoginForm = () =>{ 
    setShowLogin(true)
    setTitleModal("Iniciar Sesion")
  }

  const ShowRegisterForm = () => {
    setShowLogin(false)
    setTitleModal("Registrarse")
  }

  return (showLogin ?
    <LoginForm ShowRegisterForm={ShowRegisterForm} onCloseModal={onCloseModal}/>
    :
    <RegisterForm ShowLoginForm={ShowLoginForm}/>
  )
}

export default Auth