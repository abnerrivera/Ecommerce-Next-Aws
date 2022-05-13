import React from 'react'
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'

export default function MenuWeb() {
  return (
    <div className='menu'>
      <Container>
        <Grid>

          <Grid.Column className='menu__left' width={6}>
            <MenuPlataform />
          </Grid.Column>

          <Grid.Column className='menu__right' width={10}>
            <MenuUser />
          </Grid.Column>

        </Grid>
      </Container>
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

function MenuUser() {
  return (
    <Menu>
      <OptionMenu
        icon={<Icon name='user outline' />}
        link="/account"
        optionTitle="MI CUENTA"
      />
    </Menu>

  )
}