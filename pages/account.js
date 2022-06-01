import React from 'react'
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../services/user';
import { useEffect, useState } from 'react';

//COMPONENTS
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';

const Account = () => {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  //TRAER DATA DEL USUARIO
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null) //setea el valor cuando tenga valor dentro
    })()
  }, [auth])

  if (user === undefined) return null;

  if (!auth && !user) { //mientras user y auth este vacion es que no esta autenticado ni logueado entonces no deja acceder a esta ruta
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className='account'>
      <Configuration user={user} setReloadUser={setReloadUser} />
    </BasicLayout>
  )
}

export default Account

function Configuration({ user, logout, setReloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">

        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />

        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
      </div>
    </div>
  )
}