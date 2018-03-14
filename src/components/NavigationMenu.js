import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavigationMenu = () => {
  return (
    <Menu inverted>
      <Menu.Item link>
        <NavLink exact to='/' activeStyle={linkStyle}>Reseptit</NavLink>
      </Menu.Item>
      <Menu.Item link>
        <NavLink exact to='/login' activeStyle={linkStyle}>Kirjaudu</NavLink>
      </Menu.Item>
    </Menu>
  )
}

const linkStyle = {
  fontStyle: 'italic'
}

export default NavigationMenu