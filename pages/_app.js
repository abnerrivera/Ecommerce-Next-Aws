//IMPORTAMOS DESDE ACA LOS ESTILOS PARA QUE SEAN GLOBALES
import "../scss/global.scss"

//IMPORTAMOS SEMANTIC
import "semantic-ui-css/semantic.min.css"

//toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return <>
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
  </>
}

export default MyApp
