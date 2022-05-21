//REACT
import React from 'react';
import { useState } from 'react';

//UI
import { Form, Button } from 'semantic-ui-react';

//FORM
import { useFormik } from 'formik';
import * as Yup from 'yup';

//TOAST
import { toast } from 'react-toastify';

//DATA
import { loginApi } from '../../../services/user';

//CONTEXTO
import useAuth from '../../../hooks/useAuth';


const LoginForm = ({ ShowRegisterForm, onCloseModal }) => {

  //CONTEXT
  const { login } = useAuth();


  //ESTADO PARA MOSTRAR PRELOAD
  const [loading, setLoading] = useState(false)


  //LOGICA FORMULARIO
  const formik = useFormik({

    //VALORES INICIALES (VALORES TRAIDOS DESDE UNA FUNCION)
    initialValues: initialValues(),

    //VALIDACIONES FORMULARIO
    validationSchema: Yup.object(validationSchema()),

    //TRAEMOS LA DATA DEL FORM
    onSubmit: async (formData) => {

      //INICIA EL PRELOAD
      setLoading(true)
      //GUARDAMOS LA RESPUESTA DE LA PETICION
      const response = await loginApi(formData)//FUNCION PARA ENVIAR DATA AL API
      //console.log(response)

      //VALIDACION DATA
      if (response?.jwt) {
        const token = response.jwt
        login(token) //ENVIA TOKEN AL CONTEXT
        onCloseModal();
      } else {
        toast.error("USUARIO o CONTRASEÑA incorrectos")
      }

      //AL TERMINAR QUITA EL PRELOAD
      setLoading(false)
    }
  })




  return (

    <Form className="login-form" onSubmit={formik.handleSubmit}> {/* REQUERIDO POR EL PAQUETE DE FORMIK (TOMA LA DATA DEL FORM)*/}

      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electronico"
        onChange={formik.handleChange /*REQUERIDO PARA CAPTURAR EL VALOR DEL INPUT*/}
        error={formik.errors.identifier /*REQUERIDO PARA MANEJAR EL ERROR DE VALIDACION*/}
      />

      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className='actions'>

        <Button type='button' basic onClick={ShowRegisterForm /*EJECUTA FUNCION HEREDADA (AUTH)*/}>
          Registrarse
        </Button>

        <div>
          <Button type='button'>¿Olvidaste la contraseña?</Button>
          <Button type='submit' className='submit' loading={loading /*TRAE EL VALOR DEL PRELOAD*/}>
            Iniciar sesion
          </Button>
        </div>

      </div>

    </Form>
  )
}

export default LoginForm


//VALORES INICIALES EN FUNCION QUE SE LLAMA EN EL FORMIK
function initialValues() {
  return {
    identifier: "",
    password: ""
  }
}

//VALIDACION REALIZADA PARA CADA INPUT
function validationSchema() {
  return {
    identifier: Yup.string().email(true).required("correo NO VALIDO"),
    password: Yup.string().required("Contraseña REQUERIDA")
  }
}