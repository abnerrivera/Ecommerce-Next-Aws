import React from 'react';
import { useState } from 'react';

//UI
import { Form, Button } from 'semantic-ui-react';

//FORM CONTROLLER
import { useFormik } from 'formik';
import * as Yup from 'yup';

//TOAST (ALERTS)
import { toast } from 'react-toastify';

//FUNCIONES
import { updateNameApi } from '../../../services/user';


const ChangeNameForm = ({ user, logout, setReloadUser }) => {

  //LOADING
  const [loading, setLoading] = useState(false);

  //FORMLOGIC
  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true)
      const response = await updateNameApi(user.id, formData, logout)
      if(!response){
        toast.error("Algo salio mal al actualizar tus datos");
      }else{
        setReloadUser(true) //cambiamos el estado de la peticion de app para que vuelva a hacerce al ejecutarse esta y asi cambiar los valores en tiempo real (name, lastname)
        toast.success("Datos Actualizados con EXITO");
      }
      setLoading(false)
    }
  })


  return (
    <div className='change-name-form'>

      <h4>Cambia tu nombre y apellidos</h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>

          <Form.Input
            name='name'
            placeholder='Nombres Nuevos'
            value={formik.values.name}

            onChange={formik.handleChange}
            error={formik.errors.name}
          />

          <Form.Input
            name='lastname'
            placeholder='Apellidos Nuevos'
            value={formik.values.lastname}

            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />

        </Form.Group>
        <Button className='submit' type='submit' loading={loading}>
          Actualizar
        </Button>
      </Form>

    </div>
  )
}

export default ChangeNameForm

//VALORES INICIALES FORM
function initialValues(name, lastname) {
  return {
    name: name || "", //si name llega lo pone si no deja vacio
    lastname: lastname || "",
  }
}

//VALIDACION FORM
function validationSchema() {
  return {
    name: Yup.string().required("Debe poner un NOMBRE NUEVO"),
    lastname: Yup.string().required("Debe poner un APELLIDO NUEVO"),
  }
}