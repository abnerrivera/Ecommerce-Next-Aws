import { BASE_PATH } from '../utils/constants'

export async function registerApi (formData){

  try {

    const url = `${BASE_PATH}/api/auth/local/register`;
    
    const params = {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData) //envia la data en texto json y no objeto
    }

    const response = await fetch(url, params);
    const result = await response.json();

    return result;


  } catch (error) {
    console.log(error)
    return null;
  }
}