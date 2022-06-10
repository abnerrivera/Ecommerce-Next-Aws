import React from 'react'
import { useState } from 'react';

//UI FORM
import { Form, Button } from 'semantic-ui-react';

//FORM CONTROLLER
import { useFormik } from 'formik';
import * as Yup from 'yup';

//TOAST
import { toast } from 'react-toastify';

//API
import { updatePassApi } from '../../../services/user';


const ChangepassForm = ({ user, logout }) => {

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePassApi(user.id, formData.password, logout);
      if (!response) {
        toast.error("Error al ACTUALIZAR");
      } else if (response?.data === null) {
        toast.error("Error al ACTUALIZAR");
      } else {
        toast.success("Ingresa con tu nueva contraseña");
        logout();
      }
      setLoading(false)
    }
  })

  return (
    <div className='change-pass-form'>
      <h4>Cambiar Contraseña</h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            name="password"
            type="password"
            placeholder="Tu nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Repite la contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button
          loading={loading}
          className='submit'
          type='submit'
        >Actualizar
        </Button>
      </Form>

    </div>
  )
}

export default ChangepassForm

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  }
}

function validationSchema() {
  return {
    password: Yup.string()
      .required("Contraseña no valida")
      .oneOf([Yup.ref("repeatPassword")], "NO COINCIDEN"),
    repeatPassword: Yup.string()
      .required("Contraseña no valida")
      .oneOf([Yup.ref("password")], "NO COINCIDEN"),
  }
}