import { useContext } from 'react';

//TRAEMOS EL CONTEXTO CREADO
import AuthContext from '../context/AuthContext';

//EXPORTAMOS EL CONTEXTO 
export default () => useContext(AuthContext)