import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';


//REGISTER USER
export async function registerApi(formData) {

  try {

    const url = `${BASE_PATH}/api/auth/local/register`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData) //envia la data en texto json y no objeto
    }

    const response = await fetch(url, params); //ENVIAMOS LA DARA

    const result = await response.json(); //RESPUESTA DEL API

    return result;


  } catch (error) {
    console.log(error)
    return null;
  }
}



//LOGIN USER
export async function loginApi(formData) {

  try {

    const url = `${BASE_PATH}/api/auth/local`

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }

    const response = await fetch(url, params);
    const result = await response.json();

    return result;

  } catch (error) {
    console.log(error)
    return null;
  }

}



//FORGOTPASS
export async function resetPasswordApi(email) {

  try {

    const url = `${BASE_PATH}/api/auth/forgot-password`

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    }

    const response = await fetch(url, params);
    const result = await response.json();

    return result;

  } catch (error) {
    console.log(error)
    return null;
  }
}


//DATAUSER AUTH
export async function getMeApi(logout) {
  try {
    const url = `${BASE_PATH}/api/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
}

//UPDATE NAME USER
export async function updateNameApi(idUser, data, logout){
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

//UPDATE NAME USER
export async function updateEmailApi(idUser, email, logout){
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({email}),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}