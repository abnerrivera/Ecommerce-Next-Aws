import React from 'react';
import {useState} from 'react';
//ui
import { Form, Button } from 'semantic-ui-react';

//form
import { useFormik } from 'formik';
import * as Yup from 'yup';

//toast
import { toast } from 'react-toastify';

//data
import {loginApi} from '../../../services/user';


const LoginForm = ({ ShowRegisterForm, onCloseModal }) => {

  //loading
  const [loading, setLoading] = useState(false)

  //form
  const formik = useFormik({

    initialValues: initialValues(),

    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {
      setLoading(true)
      const response = await loginApi(formData)
      console.log(response)

      //validation
      if (response?.jwt) {
        //toast.success("Logueo de manera correcta")
        onCloseModal();
      } else {
        toast.error("USUARIO o CONTRASEÑA incorrectos")
      }

      setLoading(false)
    }



  })

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>

      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />

      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className='actions'>

        <Button type='button' basic onClick={ShowRegisterForm}>
          Registrarse
        </Button>

        <div>
          <Button type='button'>¿Olvidaste la contraseña?</Button>
          <Button type='submit' className='submit' loading={loading}>
            Iniciar sesion
          </Button>
        </div>

      </div>

    </Form>
  )
}

export default LoginForm


//valores iniciales
function initialValues(){
  return{
    identifier: "",
    password: ""
  }
}

//validation
function validationSchema(){
  return{
    identifier: Yup.string().email(true).required("correo NO VALIDO"),
    password: Yup.string().required("Contraseña REQUERIDA")
  }
}