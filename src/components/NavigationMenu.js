import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, Redirect } from 'react-router-dom'

class NavigationMenu extends React.Component {

  state = {
    logout: false,
    activeItem: 'home'
  }

  handleClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  doLogout = () => {
    this.props.handleLogout()
    this.setState({ logout: true })
  }

  render() {
    if (this.state.logout) {
      return <Redirect to='/' />
    }

    const { activeItem } = this.state

    const user = this.props.user
    if (user.id === null) {
      return (
        <Menu inverted>
          <Menu.Item link name='home' active={activeItem === 'home'} onClick={this.handleClick}>
            <NavLink exact to='/'>Reseptit</NavLink>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item link name='login' active={activeItem === 'login'} onClick={this.handleClick}>
              <NavLink exact to='/login'>Kirjaudu</NavLink>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )
    }

    return (
      <Menu inverted>
        <Menu.Item link name='home' active={activeItem === 'home'} onClick={this.handleClick}>
          <NavLink exact to='/'>Reseptit</NavLink>
        </Menu.Item>
        <Menu.Item link name='add' active={activeItem === 'add'} onClick={this.handleClick}>
          <NavLink exact to='/newRecipe'>Lisää resepti</NavLink>
        </Menu.Item>
        <Menu.Item link name='favorites' active={activeItem === 'favorites'} onClick={this.handleClick}>
          <NavLink exact to='/favorites'>Suosikit</NavLink>
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

export default NavigationMenu