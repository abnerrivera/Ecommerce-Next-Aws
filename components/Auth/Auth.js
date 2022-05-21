//REACT
import React from 'react';
import { useState } from 'react';

//COMPONENTS
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const Auth = ({ onCloseModal, setTitleModal }) => {

  //ESTADO PARA MOSTRAR FORMULARIO DE LOGIN O REGISTRO
  const [showLogin, setShowLogin] = useState(true)


  //MUESTRA FORMULARIO LOGIN Y CAMBIA EL TITULO
  const ShowLoginForm = () => {
    setShowLogin(true)
    setTitleModal("Iniciar Sesion")
  }


  //MUESTRA FORMULARIO DE REGISTRO Y CAMBIA EL TITULO
  const ShowRegisterForm = () => {
    setShowLogin(false)
    setTitleModal("Registrarse")
  }


  //SI showLogin ES TRUE MUESTRA EL FORMULARIO DE LOGIN, SI NO, EL DE REGISTRO
  return (showLogin ?
    <LoginForm
      ShowRegisterForm={ShowRegisterForm} //ENVIAMOS LA FUNCION POR PROPS PARA SER EJECUTADA EN EL LOGIN
      onCloseModal={onCloseModal} //FUNCION DESDE EL PADRE (MENU)
    />
    :
    <RegisterForm
      ShowLoginForm={ShowLoginForm} //ENVIAMOS LA FUNCION POR PROPS PARA SER EJECUTADA EN EL REGISTER
    />
  )
}

export default Auth