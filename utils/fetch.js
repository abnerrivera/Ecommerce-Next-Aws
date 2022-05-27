import { getToken, hasExpiredToken } from '../services/token';

//FUNCION PARA HACER PETICIONES PROTEJIDAS (AUTORIZADAS) POR ID DEL USUARIO INDIVIDUAL
export async function authFetch(url, params, logout) {
  const token = getToken();
  if (!token) {
    //USUARIO NO LOGUEADO
    logout();
  } else {

    if (hasExpiredToken(token)) {
      //TOKEN CADUCADO
      logout();
    } else {

      const paramsTemp = {
        ...params, //los ... indica que aca se uniran los valores que traida de la prop
        headers: {
          ...params?.headers,
          authorization: `Bearer ${token}` //Bearer es por defecto solicitado en strapi
        },
      };

      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }

    }
  }
}
