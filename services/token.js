import jwtDecode from "jwt-decode";
import { TOKEN } from "../utils/constants";

export function setToken (token){
  localStorage.setItem(TOKEN, token)
}

export function getToken () {
  return localStorage.getItem(TOKEN)
}

export function deleteToken() {
  localStorage.removeItem(TOKEN)
}

export function hasExpiredToken(token){
  const tokenDecode = jwtDecode(token)//DECODIFICAMOS EL TOKEN USANDO LA LIBRERIA JWT
  const expireDate = tokenDecode.exp * 1000; //TOMAMOS LA PROPIEDAD EXP DEL OBJETO Y MULTIPLICAOS POR MIL PAR AUSARLO EN SEGUNDOS
  const currentDate = new Date().getTime; //TOMAMOS LA FECHA ACTUAL
  
  //EXPIRO?
  if(currentDate > expireDate){
    return true;
  }
    return false;
  
}