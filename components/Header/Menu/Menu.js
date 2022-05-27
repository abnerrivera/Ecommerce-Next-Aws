import React from 'react'
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'
import BasicModal from '../../Modal/BasicModal/BasicModal'
import { useState } from 'react'
import Auth from '../../Auth/Auth'
import useAuth from '../../../hooks/useAuth'
import { useEffect } from 'react'
import { getMeApi } from '../../../services/user';


export default function MenuWeb() {

  const [modal, setModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Inicia Sesion");
  const [user, setUser] = useState(undefined);

  const onCloseModal = () => setModal(false);
  const onShowModal = () => setModal(true);

  const { logout, auth } = useAuth();

  useEffect(() => {
    (async () => { //UTILIZAMOS LA FUNCION QUE SE LLAMA A SI MISMA DE MANERA ASYNCRONA PARA QUE EL USEEFFECT SEA "ASYNC"
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);


  return (
    <div className='menu'>
      <Container>
        <Grid>

          <Grid.Column className='menu__left' width={6}>
            <MenuPlataform />
          </Grid.Column>

          <Grid.Column className='menu__right' width={10}>
            {user !== undefined && (
              <MenuUser
                showModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}


          </Grid.Column>

        </Grid>
      </Container>

      <BasicModal
        show={modal}
        setShow={setModal}
        title={titleModal}
        size="tiny"
      >
        <Auth
          onCloseModal={onCloseModal}
          setTitleModal={setTitleModal}
        />

      </BasicModal>

    </div>
  )
}

function OptionMenu({ link, optionTitle, icon }) {
  return (
    <Link href={link} >
      <a>
        <Menu.Item>
          <Icon name={icon} />
          {optionTitle}
        </Menu.Item>
      </a>
    </Link>
  )
}


function MenuPlataform() {
  return (

    <Menu>

      <OptionMenu
        link="/psp"
        optionTitle="PSP"
      />

      <OptionMenu
        link="/pc"
        optionTitle="PC"
      />

      <OptionMenu
        link="/switch"
        optionTitle="SWITCH"
      />

    </Menu>
  )
}

function MenuUser({ showModal, user, logout }) {
  return (
    <Menu>
      {user ? (
        <>

          <OptionMenu
            icon='game'
            link='/orders'
            optionTitle='Mis Pedidos'
          />

          <OptionMenu
            icon='heart outline'
            link='/wishlist'
            optionTitle='Juegos Favoritos'
          />

          <OptionMenu
            icon='user outline'
            link='/account'
            optionTitle={`${user.name} ${user.lastname}`}
          />

          <Link href='/cart' >
            <Menu.Item>
              <Icon name='cart' />
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout} style={{ margin: '0' }}>
            <Icon name='power off' />
          </Menu.Item>

        </>
      ) : (
        <Link href='/#' >
          <a onClick={showModal}>
            <Menu.Item>
              <Icon name='user outline' />
              CUENTA
            </Menu.Item>
          </a>
        </Link>
      )}
    </Menu>

  )
}