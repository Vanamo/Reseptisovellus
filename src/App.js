import React from 'react'
import { connect } from 'react-redux'
import recipeService from './services/recipes'
import { initRecipes } from './reducers/recipeReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'
import { Container } from 'semantic-ui-react'
import NavigationMenu from './components/NavigationMenu'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'

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
        <Container>
          <Router>
            <div>
              <NavigationMenu />
              <h1>Reseptisovellus</h1>
              <Notification />

              <Route exact path='/' render={() =>
                <RecipeList recipes={this.props.recipes}/>
              } />

              <Route exact path='/login' render={() =>
                <LoginForm
                  handleSubmit={this.login}
                  handleChange={this.handleLoginFieldChange}
                  username={this.state.username}
                  password={this.state.password}
                />
              } />
            </div>
          </Router>
        </Container>
      )
    }

    return (
      <Container>
        <h1>Reseptisovellus</h1>
        <p>{this.props.user.name} logged in
          <button onClick={this.handleLogout}>logout</button></p>

        <RecipeList recipes={this.props.recipes}/>
      </Container>
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
