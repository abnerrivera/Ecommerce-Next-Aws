//IMPORTAMOS DESDE ACA LOS ESTILOS PARA QUE SEAN GLOBALES
import "../scss/global.scss";

//IMPORTAMOS SEMANTIC
import "semantic-ui-css/semantic.min.css";

//TOAST
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//CONTEXT
import AuthContext from "../context/AuthContext";
import { setToken, getToken, deleteToken } from "../services/token";

//DATA EN MEMORIA
//este hook sirve para memorizar la data cargada y no volver a cargarla, solo cambia valores cambiados
import { useMemo, useState, useEffect } from 'react';

//DECODE JWT
import jwtDecode from "jwt-decode";

//RUTAS
import { useRouter } from "next/router"


function MyApp({ Component, pageProps }) {

  //MANEJO DE RUTA
  const route = useRouter();

  //ESTADO INICIAL OBJETO ENVIADO AL CONTEXT
  const [auth, setAuth] = useState(undefined)
  //console.log(auth)

  //SE USA PARA PODER FORZAR LA EJECUCION DEL USEEFFECT CUANDO SEA NECESARIO
  const [reloadUser, setReloadUser] = useState(false)


  //FUNCION QUE GUARDA DATOS AL HACER LOGIN Y LOS ENVIA AL AUTHDATA
  const login = (token) => { //TOMO EL PARAMETRO DESDE EL LOGINFORM 
    setToken(token)//setea token en el local storage
    setAuth({
      token: token,
      idUser: jwtDecode(token).id //decodifica el jwt
    })
  }

  //CERRA SESION
  const logout = () => {
    if (auth) {
      deleteToken();
      setAuth(null);
      route.push("/")
      toast.success("Sesion cerra con exito")
    }
  }


  // VALORES ENVIADOS AL CONTEXTO
  const authData = useMemo( //usememo RECARGA LA PAGINA SOLO SI LLEGA DIFERENTE DATA DE LA GUARDADA
    () => ({
      auth: auth,
      login,
      logout,
      setReloadUser, //cuando la funcion tiene el mismo nombre se deja un unico nombre 
    }), [auth] //ACTUALIZA CADA VEZ QUE CAMBIE AUTH
  );





  //MANETENER EL USUARIO LOGUEADO AL RECARGAR PAGINA
  useEffect(() => {
    //si recibo token es porque estoy logueado
    const token = getToken()

    if (token) { //si esta logueado
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null)
    }

    setReloadUser(false)
  }, [reloadUser])


  if (auth === undefined) return null;//sirve para decirle al app que no esta logueado

  return (
    //ENCERRAMOS TODA EL APP EN EL CONTEXTO PARA QUE LA DATA SEA ACCESIBLE DESDE CUALQUIER HIJO
    <AuthContext.Provider value={authData /*DATA GUARDADA EN EL USEMEMO*/}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}

export default MyApp
