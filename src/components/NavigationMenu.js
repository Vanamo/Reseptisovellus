import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class NavigationMenu extends React.Component {
  render() {
    const user = this.props.user
    if (user.id === null) {
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

    return (
      <Menu inverted>
        <Menu.Item link>
          <NavLink exact to='/' activeStyle={linkStyle}>Reseptit</NavLink>
        </Menu.Item>
        <Menu.Item link>
          <NavLink exact to='/newRecipe' activeStyle={linkStyle}>Lisää resepti</NavLink>
        </Menu.Item>
        <Menu.Item link>
          <a href='' onClick={this.props.handleLogout}>Kirjaudu ulos</a>
        </Menu.Item>
      </Menu>
    )
  }
}

const linkStyle = {
  fontStyle: 'italic'
}

export default NavigationMenu