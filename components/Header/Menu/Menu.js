import React from 'react'
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'
import BasicModal from '../../Modal/BasicModal/BasicModal'
import { useState } from 'react'
import { useEffect } from 'react'

export default function MenuWeb() {

  const [modal, setModal] = useState(false)

  return (
    <div className='menu'>
      <Container>
        <Grid>

          <Grid.Column className='menu__left' width={6}>
            <MenuPlataform />
          </Grid.Column>

          <Grid.Column className='menu__right' width={10}>
            <MenuUser
              showModal={()=>setModal(true)}
            />
          </Grid.Column>

        </Grid>
      </Container>

      <BasicModal
        show={modal}
        setShow={setModal}
        title="Inicia Sesion"
        size="small"
      >
        <h2>MODAL</h2>
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