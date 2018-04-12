import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, Redirect } from 'react-router-dom'

class NavigationMenu extends React.Component {

  state = {
    logout: false
  }

  doLogout = () => {
    this.props.handleLogout()
    this.setState({ logout: true })
  }

  render() {
    if (this.state.logout) {
      return <Redirect to='/' />
    }

    const user = this.props.user
    if (user.id === null) {
      return (
        <Menu inverted>
          <Menu.Item link>
            <NavLink exact to='/' activeStyle={linkStyle}>Reseptit</NavLink>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item link>
              <NavLink exact to='/login' activeStyle={linkStyle}>Kirjaudu</NavLink>
            </Menu.Item>
          </Menu.Menu>
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
          <NavLink exact to='/favorites' activeStyle={linkStyle}>Suosikit</NavLink>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>{user.username}</Menu.Item>
          <Menu.Item link>
            <a href='' onClick={this.doLogout}>Kirjaudu ulos</a>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const linkStyle = {
  fontStyle: 'italic'
}

export default NavigationMenu