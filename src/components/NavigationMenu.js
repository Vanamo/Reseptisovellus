import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NavigationMenu extends React.Component {

  state = {
    activeItem: this.props.location.pathname
  }

  handleClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  doLogout = () => {
    this.props.handleLogout()
  }

  render() {

    const { activeItem } = this.state

    const user = this.props.user
    if (user.id === null) {
      return (
        <Menu stackable inverted>
          <Menu.Item as={Link} to='/' name='/' active={activeItem === '/'} onClick={this.handleClick}>
            Reseptit
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/login' name='/login' active={activeItem === '/login'} onClick={this.handleClick}>
              Kirjaudu
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )
    }

    return (
      <Menu stackable inverted>
        <Menu.Item as={Link} to='/' name='/' active={activeItem === '/'} onClick={this.handleClick}>
          Reseptit
        </Menu.Item>
        <Menu.Item as={Link} to='/newRecipe' name='/newRecipe' active={activeItem === '/newRecipe'} onClick={this.handleClick}>
          Lisää resepti
        </Menu.Item>
        <Menu.Item as={Link} to='/favorites' name='/favorites' active={activeItem === '/favorites'} onClick={this.handleClick}>
          Suosikit
        </Menu.Item>
        <Menu.Item as={Link} to='/menu' name='/menu' active={activeItem === '/menu'} onClick={this.handleClick}>
          Ruokalista
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>{user.username}</Menu.Item>
          <Menu.Item as={Link} to='/' onClick={this.doLogout}>
            Kirjaudu ulos
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavigationMenu