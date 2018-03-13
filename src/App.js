import React from 'react'
import { connect } from 'react-redux'
import recipeService from './services/recipes'
import { initRecipes } from './reducers/recipeReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'

class App extends React.Component {

  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    this.props.initRecipes()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser({ user })
      recipeService.setToken(user.token)
    }
  }

  login = (event) => {
    event.preventDefault()
    const user = ({
      username: this.state.username,
      password: this.state.password
    })

    this.props.loginUser(user)

    this.setState({ username: '', password: '' })

  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogout = () => {
    window.localStorage.clear()
    this.props.logoutUser()
  }

  render() {

    if (this.props.user.username === null) {
      return (
        <div>
          <Notification />

          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleLoginFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    return (
      <div>
        <h1>Reseptisovellus</h1>
        <p>{this.props.user.name} logged in
          <button onClick={this.handleLogout}>logout</button></p>
        {this.props.recipes.map(r => r.title)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    recipes: state.recipes
  }
}

export default connect(
  mapStateToProps,
  {
    initRecipes, setUser, loginUser, logoutUser
  }
)(App)
