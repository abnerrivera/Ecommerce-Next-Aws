import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

//form
import { useFormik } from 'formik'
import * as Yup from 'yup'

//data
import { registerApi } from '../../../services/user'

//toast
import { toast } from 'react-toastify'




const RegisterForm = ({ ShowLoginForm }) => {


  const [loading, setLoading] = useState(false);


  const formik = useFormik({

    initialValues: initialValues(),

    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {

      setLoading(true)
      //funcion peticion api
      const response = await registerApi(formData)

      //console.log(response)

      //validation
      if (response?.jwt) {
        toast.success("Registrado de manera correcta")
        ShowLoginForm();
      } else {
        toast.error("Correo ya esta en uso")
      }

      setLoading(false)
    }

  });



  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>

      <Form.Input
        name='name'
        type='text'
        placeholder='Nombre'
        onChange={formik.handleChange}
        error={formik.errors.name}
      />

      <Form.Input
        name='lastname'
        type='text'
        placeholder='Apellido'
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />

      <Form.Input
        name='username'
        type='text'
        placeholder='Nombre de usuario'
        onChange={formik.handleChange}
        error={formik.errors.username}
      />

      <Form.Input
        name='email'
        type='text'
        placeholder='Correo electronico'
        onChange={formik.handleChange}
        error={formik.errors.email}
      />

      <Form.Input
        name='password'
        type='password'
        placeholder='Contraseña'
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className='actions'>

        <Button type='button' basic onClick={ShowLoginForm}>
          Iniciar Sesion
        </Button>

        <Button type='submit' className='submit' loading={loading}>
          Registrarse
        </Button>
      </div>


    </Form>
  )
}

export default RegisterForm

//valores iniciales formulario
function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: ""
  }
}


//validacion formulario
function validationSchema() {
  return {
    name: Yup.string().required("Nombre es REQUERIDO"),
    lastname: Yup.string().required("Apellido es REQUERIDO"),
    username: Yup.string().required("Usuario es REQUERIDO"),
    email: Yup.string().email(true).required("Email NO VALIDO"),
    password: Yup.string().required("Contraseña REQUERIDA")
  }
}