import React from 'react'
import { useState } from 'react';

//UI FORM
import { Form, Button } from 'semantic-ui-react';

//FORM CONTROLLER
import { useFormik } from 'formik';
import * as Yup from 'yup';

//TOAST
import { toast } from 'react-toastify';

//FUNCIONES 
import { updateEmailApi } from '../../../services/user';


const ChangeEmailForm = ({ user, logout, setReloadUser }) => {

  const [loadig, setLoadig] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema:Yup.object( validationSchema()),
    onSubmit: async (formData) => {
      setLoadig(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if(!response){
        toast.error("Error al ACTUALIZAR");
      }else if (response?.data === null){  //validacion si data llega vacio es porque hubo un error
        toast.error("Error al ACTUALIZAR");
      }else{
        setReloadUser(true);
        toast.success("Acualizado con EXITO");
        formik.handleReset(); //limpia el formulario
      }
      setLoadig(false)
    },
  })

  return (
    <div className='change-email-form'>
      <h4>Cambia tu E-mail </h4>
      <h4>E-mail actual: <span>{user.email}</span></h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Email nuevo"
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confimra el Email nuevo"
            onChange={formik.handleChange}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>

        <Button 
        className='submit' 
        type='submit' 
        loading={loadig}
        > Actualizar 
        </Button>
        
      </Form>
    </div>
  )
}

export default ChangeEmailForm

function initialValues() {
  return{
    email: "",
    repeatEmail: "",
  }
}


function validationSchema() {
  return{
    email: Yup.string()
    .email()
    .required("Email NO VALIDO")
    .oneOf([Yup.ref("repeatEmail")], "NO COINCIDEN"), //hace un versus con repeatEmail y si nmo es igual poner error en true
    repeatEmail: Yup.string()
    .email()
    .required("Email NO VALIDO")
    .oneOf([Yup.ref("email")], "NO COINCIDEN"), //hace versus con email
  }
}
