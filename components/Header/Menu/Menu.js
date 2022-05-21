import React from 'react'
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'
import BasicModal from '../../Modal/BasicModal/BasicModal'
import { useState } from 'react'
import Auth from '../../Auth/Auth'

export default function MenuWeb() {

  const [modal, setModal] = useState(false)
  const [titleModal, setTitleModal] = useState("Inicia Sesion")

  const onCloseModal = () => setModal(false)
  const onShowModal = () => setModal(true)

  return (
    <div className='menu'>
      <Container>
        <Grid>

          <Grid.Column className='menu__left' width={6}>
            <MenuPlataform />
          </Grid.Column>

          <Grid.Column className='menu__right' width={10}>
            <MenuUser
              showModal={onShowModal}
            />
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
    <Link href={link}>
      <a>
        <Menu.Item>
          {icon}
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

function MenuUser({ showModal }) {
  return (
    <Menu>
      <Link href='/#' >
        <a onClick={showModal}>
          <Menu.Item>
            <Icon name='user outline' />
            CUENTA
          </Menu.Item>
        </a>
      </Link>
    </Menu>

  )
}