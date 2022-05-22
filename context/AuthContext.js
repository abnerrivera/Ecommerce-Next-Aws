//REACT
import { createContext } from 'react';


//CREAMOS EL CONTEXT VALORES POR DEFECTO
const AuthContext = createContext({
  auth: undefined, //OBJETO QUE GUARDA DATOS GENERADOS DEL USER
  login: () => null, //FUNCION QUE PODRA SER EJECUTADA EN CUALQUIER LUGAR DEL APP (LOGUEO)
  logout: () => null,
  setReloadUser: () => null,
})

export default AuthContext;